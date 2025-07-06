import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {
  /** Number of skeleton cards to display */
  @Input() count = 4;

  get skeletonArray() {
    return Array.from({ length: this.count }, (_, i) => i);
  }
} 