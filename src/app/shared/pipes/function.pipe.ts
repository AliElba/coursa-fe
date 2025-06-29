import { Pipe, PipeTransform } from '@angular/core';

/**
 * Global Function Pipe - A reusable pipe that can execute any function with arguments
 * 
 * This pipe provides a way to call functions directly in templates while maintaining
 * Angular's change detection performance benefits. It's particularly useful for:
 * - Reusable utility functions
 * - Complex calculations
 * - Data transformations
 * - Conditional logic
 * 
 * Performance Benefits:
 * - Pure pipe: Only recalculates when inputs change
 * - Cached results: Prevents unnecessary function calls
 * - Better than method calls in templates
 * 
 * Usage Examples:
 * ```html
 * <!-- Simple function call -->
 * {{ value | function:formatCurrency:currency }}
 * 
 * <!-- Complex calculation -->
 * {{ user | function:calculateUserScore:weights:bonus }}
 * 
 * <!-- Conditional logic -->
 * @if (course | function:isUserRegistered:userCourses) {
 *   Registered
 * }
 * 
 * <!-- Multiple arguments -->
 * {{ data | function:processData:config:options:true }}
 * ```
 * 
 * Important Notes:
 * - Functions should be pure (same input = same output)
 * - Avoid side effects in functions used with this pipe
 * - Consider creating specific pipes for frequently used functions
 * - This pipe is not a replacement for all method calls, use judiciously
 */
@Pipe({
  name: 'function',
  standalone: true,
  pure: true // Ensures the pipe only recalculates when inputs change
})
export class FunctionPipe implements PipeTransform {
  
  /**
   * Transforms a value by applying a function with optional arguments
   * Handles null/undefined arguments globally to prevent errors in utility functions.
   */
  transform<T = any, R = any>(
    value: T, 
    handler: (...args: any[]) => R, 
    ...args: any[]
  ): R | '' {
    // If any argument is null or undefined, return empty string
    if (
      value === null || value === undefined ||
      args.some(arg => arg === null || arg === undefined)
    ) {
      return '' as R;
    }

    if (!handler || typeof handler !== 'function') {
      console.warn('FunctionPipe: handler must be a valid function');
      return value as unknown as R;
    }

    try {
      // Create arguments array with value as first argument
      const functionArgs = [value, ...args];
      
      // Execute the function with all arguments
      return handler.apply(null, functionArgs);
    } catch (error) {
      console.error('FunctionPipe: Error executing function:', error);
      return '' as R;
    }
  }
}

/**
 * Async Function Pipe - For functions that return promises
 * 
 * This pipe handles asynchronous operations and automatically
 * manages the async state in templates.
 * 
 * Usage:
 * ```html
 * @if (userId | asyncFunction:fetchUserData as user) {
 *   {{ user.name }}
 * }
 * ```
 */
@Pipe({
  name: 'asyncFunction',
  standalone: true,
  pure: true
})
export class AsyncFunctionPipe implements PipeTransform {
  
  /**
   * Transforms a value by applying an async function
   * 
   * @param value - The primary value to pass to the function
   * @param handler - The async function to execute
   * @param args - Additional arguments to pass to the function
   * @returns Promise that resolves to the function result
   */
  transform<T = any, R = any>(
    value: T, 
    handler: (...args: any[]) => Promise<R>, 
    ...args: any[]
  ): Promise<R> {
    if (!handler || typeof handler !== 'function') {
      console.warn('AsyncFunctionPipe: handler must be a valid function');
      return Promise.resolve(value as unknown as R);
    }

    try {
      const functionArgs = [value, ...args];
      return handler.apply(null, functionArgs);
    } catch (error) {
      console.error('AsyncFunctionPipe: Error executing function:', error);
      return Promise.resolve(value as unknown as R);
    }
  }
} 