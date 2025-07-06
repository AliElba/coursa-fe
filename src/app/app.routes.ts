import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/login/login.component';
import { MyCoursesComponent } from './features/my-courses/my-courses.component';
import { LayoutComponent } from './layout.component';
import { CourseDetailsComponent } from './features/courses/course-details.component';
import { PaymentSuccessComponent } from './features/payment-success/payment-success.component';
import { PaymentCancelComponent } from './features/payment-cancel/payment-cancel.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Add more private routes here
      { path: '', component: LandingComponent, pathMatch: 'full' },
      { path: 'my-courses', component: MyCoursesComponent, canActivate: [AuthGuard] },
      { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },  
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancel', component: PaymentCancelComponent },
  { path: '**', redirectTo: '' }
];
