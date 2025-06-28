import { Component, Inject, PLATFORM_ID, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../core/services/courses.service';
import { AuthService } from '../../core/services/auth.service';
import { CourseDto } from '../../generated/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('coursesSection') coursesSection!: ElementRef<HTMLElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,
    private coursesService: CoursesService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  // Expose signals from the service for template binding using getters
  get courses() {
    return this.coursesService.allCourses;
  }

  get isLoading() {
    return this.coursesService.isLoading;
  }

  get error() {
    return this.coursesService.error;
  }

  get user() {
    return this.authService.user;
  }

  /**
   * Initialize component by fetching courses from the API
   */
  async ngOnInit(): Promise<void> {
    // Only fetch courses in browser environment
    if (isPlatformBrowser(this.platformId)) {
      await this.loadCourses();
      
      // Also load user courses if user is logged in to show registration status
      if (this.user()) {
        await this.loadUserCourses();
      }
    }
  }

  /**
   * Clean up when component is destroyed
   */
  ngOnDestroy(): void {
    // No specific cleanup needed for signals
  }

  /**
   * Loads all courses from the backend API
   */
  async loadCourses(): Promise<void> {
    try {
      await this.coursesService.fetchAllCourses();
    } catch (error) {
      console.error('Failed to load courses:', error);
      this.snackBar.open('Failed to load courses. Please try again later.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  /**
   * Loads user courses to determine registration status
   */
  async loadUserCourses(): Promise<void> {
    try {
      await this.coursesService.fetchUserCourses();
    } catch (error) {
      console.error('Failed to load user courses:', error);
      // Don't show error to user as this is not critical for the landing page
    }
  }

  /**
   * Scrolls smoothly to the courses section below the hero section using Angular's ViewChild
   */
  scrollToCourses(): void {
    if (this.coursesSection) {
      this.coursesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Handles course registration for the current user
   * If user is not logged in, redirects to login page
   * If user is logged in, registers for the course
   * @param course - The course to register for
   */
  async registerCourse(course: CourseDto): Promise<void> {
    const isLoggedIn = !!this.user();
    
    if (!isLoggedIn) {
      // Store the course ID for registration after login
      localStorage.setItem('pendingRegistration', String(course.id));
      this.router.navigate(['/login']);
      return;
    }

    try {
      // Check if user is already registered for this course
      const existingRegistration = this.coursesService.isUserRegisteredForCourse(course.id);
      
      if (existingRegistration) {
        this.snackBar.open('You are already registered for this course!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        return;
      }

      // Register for the course
      await this.coursesService.registerForCourse(course.id);
      
      this.snackBar.open(`Successfully registered for ${course.title}!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      // Navigate to my courses page to see the new registration
      this.router.navigate(['/my-courses']);
    } catch (error: any) {
      console.error('Error registering for course:', error);
      this.snackBar.open(
        error.message || 'Failed to register for course. Please try again.', 
        'Close', 
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
    }
  }

  /**
   * Checks if the current user is registered for a specific course
   * @param courseId - The course ID to check
   * @returns True if user is registered, false otherwise
   */
  isRegisteredForCourse(courseId: number): boolean {
    return !!this.coursesService.isUserRegisteredForCourse(courseId);
  }

  /**
   * Gets the registration status text for a course
   * @param courseId - The course ID to check
   * @returns Status text or empty string if not registered
   */
  getRegistrationStatus(courseId: number): string {
    const registration = this.coursesService.isUserRegisteredForCourse(courseId);
    return registration ? registration.status : '';
  }

  /**
   * Handles image loading errors by setting a fallback image
   * @param event - The error event from the img element
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/graduation-hat.png'; // Fallback image
  }
}
