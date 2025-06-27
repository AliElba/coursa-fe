import { Injectable, signal } from '@angular/core';
import { UserDto } from '../../generated/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<UserDto | null>(this.getUserFromStorage());

  private getUserFromStorage(): UserDto | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) as UserDto : null;
    }
    return null;
  }

  setUser(user: UserDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user.set(user);
  }

  clearUser() {
    localStorage.removeItem('user');
    this.user.set(null);
  }
} 