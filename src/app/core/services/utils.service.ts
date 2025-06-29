import { Injectable } from '@angular/core';

/**
 * Utility service for common functions used across the application
 * Provides reusable utilities like date formatting, validation, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Formats a date string for display
   * @param dateString - ISO date string
   * @returns Formatted date string (e.g., "January 15, 2024")
   */
  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Formats a date string for display with custom options
   * @param dateString - ISO date string
   * @param options - Intl.DateTimeFormatOptions
   * @returns Formatted date string
   */
  formatDateCustom(dateString: string, options: Intl.DateTimeFormatOptions = {}): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
  }

  /**
   * Formats currency for display
   * @param amount - The amount to format
   * @param currency - Currency code (default: 'USD')
   * @returns Formatted currency string
   */
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Truncates text to a specified length
   * @param text - The text to truncate
   * @param maxLength - Maximum length
   * @param suffix - Suffix to add (default: '...')
   * @returns Truncated text
   */
  truncateText(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + suffix;
  }

  /**
   * Generates a random ID
   * @param length - Length of the ID (default: 8)
   * @returns Random ID string
   */
  generateId(length: number = 8): string {
    return Math.random().toString(36).substring(2, length + 2);
  }
} 