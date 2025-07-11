// NOTE: To use this service, ensure MatSnackBarModule is imported in your app and define
// .snackbar-success, .snackbar-error, .snackbar-info in your global styles for custom colors.
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * NotificationService
 * Centralized service for showing snack bar notifications (success, error, info) across the app.
 * Wraps Angular Material's MatSnackBar for consistent usage and configuration.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show a success message
   * @param message - The message to display
   * @param duration - Duration in ms (default: 3000)
   */
  success(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    } as MatSnackBarConfig);
  }

  /**
   * Show an error message
   * @param message - The message to display
   * @param duration - Duration in ms (default: 5000)
   */
  error(message: string, duration = 5000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    } as MatSnackBarConfig);
  }

  /**
   * Show an informational message
   * @param message - The message to display
   * @param duration - Duration in ms (default: 4000)
   */
  info(message: string, duration = 4000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    } as MatSnackBarConfig);
  }
}