import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

/**
 * Main Angular application configuration
 *
 * - Sets up routing, animations, HTTP client, and zone change detection
 * - Enables client hydration for SSR
 * - Registers the service worker for PWA support (in production only)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Improves performance by coalescing zone events
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Provides Angular router with app routes
    provideRouter(routes),
    // Enables hydration for SSR and event replay
    provideClientHydration(withEventReplay()),
    // Enables browser animations
    provideAnimations(),
    // Sets up HTTP client with fetch API
    provideHttpClient(withFetch()),
    // Registers the service worker for PWA support
    // - Only enabled in production (not dev mode)
    // - Uses 'registerWhenStable:30000' to delay registration until app is stable or after 30s
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
