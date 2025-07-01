// VideoModalComponent: Angular Material dialog for playing a video from a URL (e.g., Google Drive)
// Receives the video URL via MAT_DIALOG_DATA and displays it in an iframe.
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  template: `
    <div class="video-modal-container">
      <!-- Embed the video using an iframe. The URL is sanitized using the safeUrl pipe. -->
      <iframe
        *ngIf="data.url"
        [src]="data.url | safeUrl"
        width="100%"
        height="400"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  `,
  styles: [`
    .video-modal-container {
      width: 100%;
      max-width: 700px;
      padding: 0;
    }
    iframe {
      border-radius: 8px;
      background: #000;
    }
  `]
})
export class VideoModalComponent {
  /**
   * @param data - Contains the video URL to embed (should be a Google Drive preview or similar)
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }) {}
} 