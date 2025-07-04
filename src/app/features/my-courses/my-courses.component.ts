import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../core/services/courses.service';
import { AuthService } from '../../core/services/auth.service';
import { UtilsService } from '../../core/services/utils.service';
import { UserCourseDto } from '../../generated/api';
import { isPlatformBrowser } from '@angular/common';
import { FunctionPipe } from '../../shared/pipes/function.pipe';

/**
 * Component for displaying and managing user's registered courses
 * Shows all courses the user has registered for with their current status
 */
@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FunctionPipe
  ],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private coursesService: CoursesService,
    private authService: AuthService,
    public utilsService: UtilsService,
    private snackBar: MatSnackBar
  ) {}

  // Expose signals from the service for template binding using getters
  get userCourses() {
    return this.coursesService.userCourses;
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

  get activeCourses() {
    return this.userCourses().filter((uc: any) => uc.status === 'ACTIVE');
  }

  get pendingCourses() {
    return this.userCourses().filter((uc: any) => uc.status === 'PENDING');
  }

  /**
   * Initialize component by fetching courses from the API
   */
  async ngOnInit(): Promise<void> {
    // Only fetch courses in browser environment
    if (isPlatformBrowser(this.platformId)) {
      await this.loadUserCourses();
    }
  }

  /**
   * Clean up when component is destroyed
   */
  ngOnDestroy(): void {
    // No specific cleanup needed for signals
  }

  /**
   * Loads user courses from the backend API
   */
  async loadUserCourses(): Promise<void> {
    try {
      await this.coursesService.fetchUserCourses();
    } catch (error) {
      console.error('Failed to load user courses:', error);
      this.snackBar.open('Failed to load your courses. Please try again later.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  /**
   * Activates a user course (changes status from PENDING to ACTIVE)
   * @param userCourse - The UserCourse to activate
   */
  async activateCourse(userCourse: UserCourseDto): Promise<void> {
    try {
      await this.coursesService.activateCourse(userCourse.id);
      
      this.snackBar.open(`Successfully activated ${userCourse.course.title}!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } catch (error: any) {
      console.error('Error activating course:', error);
      this.snackBar.open(
        error.message || 'Failed to activate course. Please try again.', 
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
   * Handle payment for a pending course
   * @param userCourse - The user course to pay for
   */
  async payForCourse(userCourse: UserCourseDto): Promise<void> {
    // Start Stripe Checkout for this course
    await this.coursesService.startStripeCheckout(userCourse.courseId);
  }

  /**
   * Start learning an active course
   * @param userCourse - The user course to start
   */
  startCourse(userCourse: UserCourseDto): void {
    // TODO: Navigate to course learning interface
    console.log('Starting course:', userCourse.course.title);
    
    // For now, show a message to the user
    this.snackBar.open(
      `Starting course: ${userCourse.course.title}`,
      'Close',
      { duration: 3000 }
    );
  }

  /**
   * Handle image loading errors
   * @param event - The error event
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/graduation-hat.png'; // Fallback image
  }
} 