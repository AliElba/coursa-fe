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
import { MatDialog } from '@angular/material/dialog';
import { VideoModalComponent } from './video-modal.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterModule,
    SkeletonLoaderComponent
  ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: CourseDto | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private dialog: MatDialog) {}

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

  /**
   * Opens a Material modal dialog to play the video from the given URL.
   * Converts Google Drive URLs to embed format for iframe playback.
   */
  watchVideo(url: string | null | undefined): void {
    if (url) {
      this.dialog.open(VideoModalComponent, {
        data: { url: this.getGoogleDriveEmbedUrl(url) },
        width: '720px',
        maxWidth: '95vw',
        panelClass: 'video-dialog'
      });
    }
  }

  /**
   * Converts a Google Drive share URL to an embeddable preview URL for iframes.
   * Example: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   * Result:  https://drive.google.com/file/d/FILE_ID/preview
   */
  getGoogleDriveEmbedUrl(url: string): string {
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  }
} 