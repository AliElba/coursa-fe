import { Injectable, signal } from '@angular/core';
import { UserDto } from '../../generated/api';
import { CoursesService } from './courses.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<UserDto | null>(this.getUserFromStorage());

  constructor(private coursesService: CoursesService) {}

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
    localStorage.removeItem('access_token');
    this.user.set(null);
    
    // Clear course data when user logs out
    this.coursesService.clearCourses();
  }

  /**
   * Logs out the current user by clearing user info and token from storage and memory.
   * Also clears course data.
   */
  logout() {
    this.clearUser();
  }
} 