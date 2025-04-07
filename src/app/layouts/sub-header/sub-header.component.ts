import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ lucideArrowLeft })],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
  private router = inject(Router);

  backUrl = input<string>('');


  navigateBack() {
    if (this.backUrl()) {
      this.router.navigate([this.backUrl()]);
    }
  }
}
