import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard: Prevents access to routes for unauthenticated users.
 * Redirects to /login if not logged in.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.user()) {
      return true;
    }
    // Redirect to login if not authenticated
    return this.router.createUrlTree(['/login']);
  }
} 