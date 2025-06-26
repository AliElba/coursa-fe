import { Injectable } from '@angular/core';
import { Configuration } from '../../generated/api';
import { environment } from '../../../environments/environment';

/**
 * Provides a singleton Configuration instance for all generated API clients.
 * This ensures all API calls use the global basePath from environment.apiBaseUrl.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  // The singleton configuration instance
  private config = new Configuration({ basePath: environment.apiBaseUrl });

  /**
   * Returns the global API configuration
   */
  get configuration(): Configuration {
    return this.config;
  }
} 