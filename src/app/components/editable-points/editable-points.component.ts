import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { input, output } from '@angular/core';

@Component({
  selector: 'app-editable-points',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex items-center h-full">
      <input
        type="number"
        [ngModel]="points()"
        (ngModelChange)="pointsChange.emit($event)"
        class="w-16 h-8 bg-blue-800 text-white text-center rounded border border-blue-600 focus:outline-none focus:border-blue-400"
        min="0"
        step="100"
      />
    </div>
  `
})
export class EditablePointsComponent {
  public points = input.required<number>();
  public pointsChange = output<number>();
} 