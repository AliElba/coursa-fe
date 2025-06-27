import { Component, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { isPlatformBrowser } from '@angular/common';

interface Exam {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  user: any = null;

  // Reference to the courses section
  @ViewChild('coursesSection') coursesSection!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    }
  }

  popularExams: Exam[] = [
    {
      title: 'AI Certification Exam',
      description:
        'Validate your knowledge and skills in artificial intelligence with our comprehensive certification exam.',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    },
    {
      title: 'Data Science Proficiency Test',
      description:
        'Assess your proficiency in data science with our challenging and insightful test.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Machine Learning Specialist Assessment',
      description:
        'Demonstrate your expertise in machine learning with our specialized assessment.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Deep Learning Fundamentals Exam',
      description:
        'Test your knowledge of deep learning principles and techniques with our comprehensive exam.',
      image:
        'https://images.unsplash.com/photo-1536528087227-8b3f5f9d2ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Natural Language Processing Assessment',
      description:
        'Evaluate your skills in natural language processing with our challenging and insightful assessment.',
      image:
        'https://images.unsplash.com/photo-1526378729312-5076c5a09e1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Computer Vision Applications Certification Exam',
      description:
        'Validate your knowledge and skills in computer vision applications with our comprehensive certification exam.',
      image:
        'https://images.unsplash.com/photo-1518779570999-870a3c6e8a95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
  ];

  onLogout() {
    localStorage.removeItem('user');
    this.user = null;
    // Optionally, navigate to login or reload
    // location.reload();
  }

  /**
   * Scrolls smoothly to the courses section below the hero section using Angular's ViewChild
   */
  scrollToCourses() {
    if (this.coursesSection) {
      this.coursesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
