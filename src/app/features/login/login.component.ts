import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

declare const google: any;
interface CredentialResponse {
  credential: string;     // JWT ID token (Base64URL-encoded string)
  select_by?: string;     // How the user selected the account (e.g., "user", "auto")
  state?: string;         // Optional: if you provided `state` in button, it's echoed back
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
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
      });

      const buttonElement = document.getElementById('g_id_signin');
      if (buttonElement) {
        google.accounts.id.renderButton(buttonElement, {
          type: 'standard',
          theme: 'outline',
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

  handleCredentialResponse(response: CredentialResponse) {
    try {
      // The response contains the ID token in the credential property
      const idToken = response.credential;

      // Verify the token structure (should have 3 parts)
      if (idToken.split('.').length !== 3) {
        throw new Error('Invalid ID token format');
      }

      // Store the raw ID token
      localStorage.setItem('id_token', idToken);

      // Decode JWT to get user info
      const userInfo = this.decodeJwt(idToken);

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Log the decoded token for debugging
      console.log('Decoded ID token:', userInfo);

      // Navigate to landing page
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error handling credential response:', error);
      // Handle error appropriately
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
}
