import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  avatarLoadError = false;

  constructor(public auth: AuthService) {}

  get user() {
    return this.auth.user();
  }

  onAvatarError() {
    this.avatarLoadError = true;
  }

  onLogout() {
    this.auth.clearUser();
    // Optionally redirect after logout:
    // this.router.navigate(['/login']);
  }
}
