import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesService } from '../../core/services/courses.service';
import { CourseDto } from '../../generated/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: CourseDto | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.error = null;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.course = await this.coursesService.getCourseById(id);
    } catch (err: any) {
      this.error = err?.message || 'Failed to load course details.';
    } finally {
      this.isLoading = false;
    }
  }

  // Placeholder for future video watching logic
  watchVideo(url: string | null | undefined): void {
    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  }
} 