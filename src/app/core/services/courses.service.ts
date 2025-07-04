import { Injectable, signal } from '@angular/core';
import { CoursesApi } from '../../generated/api';
import { CourseDto, UserCourseDto } from '../../generated/api';
import { ApiConfigService } from './api-config.service';

/**
 * Service for handling course-related operations
 * Provides methods to fetch courses, manage user course registrations, and handle course status
 */
@Injectable({ providedIn: 'root' })
export class CoursesService {
  // Reactive signals for course data
  public allCourses = signal<CourseDto[]>([]);
  public userCourses = signal<UserCourseDto[]>([]);
  public isLoading = signal<boolean>(false);
  public error = signal<string | null>(null);

  private coursesApi: CoursesApi;

  constructor(private apiConfig: ApiConfigService) {
    // Initialize the API client with global configuration
    const config = this.apiConfig.configuration;
    
    // Override the accessToken function to get the current token
    config.accessToken = () => {
      // Get token from localStorage (stored separately from user data)
      return localStorage.getItem('access_token') || '';
    };
    
    this.coursesApi = new CoursesApi(config);
  }

  /**
   * Fetches all available courses from the backend
   * Updates the allCourses signal with the fetched data
   */
  async fetchAllCourses(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const courses = await this.coursesApi.getAllCourses().then(response => response.data);
      this.allCourses.set(courses);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Fetches courses that the current user is registered for
   * Requires authentication - updates the userCourses signal
   */
  async fetchUserCourses(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const userCourses = await this.coursesApi.getMyCourses().then(response => response.data);
      this.userCourses.set(userCourses);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to fetch user courses');
      console.error('Error fetching user courses:', err);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Registers the current user for a specific course
   * @param courseId - The ID of the course to register for
   */
  async registerForCourse(courseId: number): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      await this.coursesApi.registerCourse(courseId);
      
      // Refresh user courses after successful registration
      await this.fetchUserCourses();
    } catch (err: any) {
      this.error.set(err.message || 'Failed to register for course');
      console.error('Error registering for course:', err);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Activates a user course (changes status from PENDING to ACTIVE)
   * @param userCourseId - The ID of the UserCourse to activate
   */
  async activateCourse(userCourseId: number): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      await this.coursesApi.activateCourse(userCourseId);
      
      // Refresh user courses after successful activation
      await this.fetchUserCourses();
    } catch (err: any) {
      this.error.set(err.message || 'Failed to activate course');
      console.error('Error activating course:', err);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Checks if a user is registered for a specific course
   * @param courseId - The course ID to check
   * @returns The UserCourse if registered, null otherwise
   */
  isUserRegisteredForCourse(courseId: number): UserCourseDto | null {
    const userCourses = this.userCourses?.();
    if (!userCourses || !Array.isArray(userCourses)) {
      return null;
    }
    return userCourses.find(uc => uc.courseId === courseId) || null;
  }

  /**
   * Gets the registration status text for a course
   * @param courseId - The course ID to check
   * @returns Status text or empty string if not registered
   */
  getRegistrationStatus(courseId: number): string {
    const registration = this.isUserRegisteredForCourse(courseId);
    return registration && registration.status ? registration.status : '';
  }

  /**
   * Clears all course data (useful for logout)
   */
  clearCourses(): void {
    this.allCourses.set([]);
    this.userCourses.set([]);
    this.error.set(null);
  }

  /**
   * Fetches a course by its ID
   * @param id - The course ID
   * @returns Promise<CourseDto>
   */
  async getCourseById(id: number): Promise<CourseDto> {
    const response = await this.coursesApi.getCourseById(id);
    return response.data;
  }

  /**
   * Starts a Stripe Checkout session for a course purchase
   * @param courseId - The ID of the course to purchase
   */
  async startStripeCheckout(courseId: number): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      // Call backend to create Stripe Checkout session
      const response = await this.coursesApi.createStripeCheckoutSession(courseId);
      const url = response.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Stripe session URL not found');
      }
    } catch (err: any) {
      this.error.set(err.message || 'Failed to start payment');
      console.error('Error starting Stripe Checkout:', err);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }
} 