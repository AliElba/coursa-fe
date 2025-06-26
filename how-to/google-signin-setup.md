# Google Sign-In Setup & Usage

This guide provides a summary of how Google Sign-In is set up and works in this project.

---

## 1. Overview
Google Sign-In allows users to authenticate using their Google account, providing a secure and convenient login experience.

---

## 2. Setup Steps

1. **Create a Google Cloud Project:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.

2. **Configure OAuth Consent Screen:**
   - In the API & Services section, set up the OAuth consent screen with your app details.

3. **Create OAuth 2.0 Credentials:**
   - Go to Credentials > Create Credentials > OAuth client ID.
   - Choose "Web application" and set the authorized redirect URIs (e.g., `http://localhost:4200` for local development).
   - Note the generated **Client ID**.

4. **Install Required Packages:**
   - For Angular, you may use packages like `@abacritt/angularx-social-login` or Google's official libraries.
   - Example:
     ```bash
     npm install @abacritt/angularx-social-login
     ```

5. **Configure the Frontend:**
   - Import and configure the Google Sign-In module in your Angular app, providing the Client ID.
   - Example (using `angularx-social-login`):
     ```typescript
     import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
     import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

     // In your providers array:
     {
       provide: 'SocialAuthServiceConfig',
       useValue: {
         autoLogin: false,
         providers: [
           {
             id: GoogleLoginProvider.PROVIDER_ID,
             provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID')
           }
         ]
       } as SocialAuthServiceConfig,
     }
     ```

---

## 3. How It Works

- When the user clicks the Google Sign-In button, a popup appears for authentication.
- On success, Google returns an ID token and user profile information.
- The frontend can send the ID token to the backend for verification and session creation.
- The user is then considered authenticated in your app.

---

## 4. Security Notes
- Always verify the Google ID token on your backend using Google's libraries or endpoints.
- Never trust the ID token solely on the frontend.

---

## 5. References
- [Google Identity Platform Documentation](https://developers.google.com/identity)
- [angularx-social-login Documentation](https://github.com/abacritt/angularx-social-login)

---

## Summary
- Register your app in Google Cloud Console and get a Client ID.
- Install and configure the frontend library.
- Implement the sign-in button and handle authentication results securely. 