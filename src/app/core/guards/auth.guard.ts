import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

/**
 * AuthGuard: Prevents access to routes for unauthenticated users.
 * Redirects to /login if not logged in.
 * Only checks authentication on the client to avoid SSR/hydration race conditions.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean | UrlTree {
    if (isPlatformBrowser(this.platformId) && this.auth.user()) {
      return true;
    }
    // Redirect to login if not authenticated or not in browser
    return this.router.createUrlTree(['/login']);
  }
} 