// SafeUrlPipe: Angular pipe to safely embed trusted resource URLs (e.g., Google Drive, YouTube) in iframes.
// Use this pipe to bypass Angular's security for resource URLs in <iframe> src bindings.
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Pipe to mark a URL as safe for use in iframe src attributes.
 * Usage: [src]="url | safeUrl"
 */
@Pipe({ name: 'safeUrl', standalone: true })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 