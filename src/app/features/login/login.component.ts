import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthApi, GoogleLoginDto } from '../../generated/api';
import { ApiConfigService } from '../../core/services/api-config.service';
import { AuthService } from '../../core/services/auth.service';
import { CoursesService } from '../../core/services/courses.service';
import { NotificationService } from '../../shared/services/notification.service';

declare const google: any;
interface CredentialResponse {
  credential: string;     // JWT ID token (Base64URL-encoded string)
  select_by?: string;     // How the user selected the account (e.g., "user", "auto")
  state?: string;         // Optional: if you provided `state` in button, it's echoed back
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private apiConfig: ApiConfigService,
    private authService: AuthService,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private notification: NotificationService // Inject NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
        lang: 'en' // Force English
      });

      const buttonElement = document.getElementById('g_id_signin');
      if (buttonElement) {
        google.accounts.id.renderButton(buttonElement, {
          type: 'standard',
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
          width: 400,
          logo_alignment: 'left'
        });
      }

      // Optional: Prompt to select account
      google.accounts.id.prompt();
    }
  }

  async handleCredentialResponse(response: CredentialResponse) {
    try {
      // The response contains the ID token in the credential property
      const idToken = response.credential;

      // Verify the token structure (should have 3 parts)
      if (idToken.split('.').length !== 3) {
        throw new Error('Invalid ID token format');
      }

      // Prepare the DTO for backend validation
      const googleLoginDto: GoogleLoginDto = { idToken };

      // Initialize the generated AuthApi with the global configuration from ApiConfigService
      const api = new AuthApi(this.apiConfig.configuration);

      // Call the backend /auth/google endpoint to validate the token and get user info
      const { data } = await api.googleLogin(googleLoginDto);

      // Store the accessToken and user info from backend response
      localStorage.setItem('access_token', data.accessToken);
      this.authService.setUser(data.user);

      // Log the backend response for debugging
      console.log('Backend AuthResponse:', data);

      // Handle pending course registration if any
      await this.handlePendingRegistration();

      // Navigate to landing page
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error handling credential response:', error);
      this.notification.error('Login failed. Please try again.');
    }
  }

  /**
   * Handles pending course registration after successful login
   */
  private async handlePendingRegistration(): Promise<void> {
    const pendingCourseId = localStorage.getItem('pendingRegistration');
    
    if (pendingCourseId) {
      try {
        const courseId = parseInt(pendingCourseId, 10);
        
        // Register for the pending course
        await this.coursesService.registerForCourse(courseId);
        
        // Clear the pending registration
        localStorage.removeItem('pendingRegistration');
        
        // Show success message
        this.notification.success('Successfully registered for the course!');
        
        // Navigate to my courses to show the new registration
        this.router.navigate(['/my-courses']);
      } catch (error: any) {
        console.error('Error registering for pending course:', error);
        this.notification.error('Failed to register for the course. You can try again from the courses page.');
        
        // Clear the pending registration even if it failed
        localStorage.removeItem('pendingRegistration');
      }
    }
  }

  decodeJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic here
      console.log(this.loginForm.value);
    }
  }

  goToLanding() {
    this.router.navigate(['/']);
  }
}
