import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div 
      class="category-header" 
      [class.editing]="isEditing()"
      (click)="startEditing()"
    >
      @if (isEditing()) {
        <input 
          #categoryInput
          type="text" 
          [ngModel]="categoryName()"
          (ngModelChange)="updateCategoryName($event)"
          (blur)="finishEditing()"
          (keydown.enter)="finishEditing()"
          class="category-input"
          autofocus
        />
      } @else {
        <div class="category-text">{{ categoryName() }}</div>
      }
    </div>
  `,
  styles: `
    .category-header {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .category-text {
      width: 100%;
      text-align: center;
      font-weight: bold;
    }
    
    .category-input {
      width: 90%;
      background: transparent;
      border: none;
      border-bottom: 1px solid white;
      color: white;
      text-align: center;
      font-weight: bold;
      outline: none;
    }
    
    .editing {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `
})
export class EditableCategoryComponent {
  public categoryName = input<string>('');
  public categoryNameChange = output<string>();
  public isEditing = signal<boolean>(false);
  
  public startEditing(): void {
    this.isEditing.set(true);
  }
  
  public finishEditing(): void {
    this.isEditing.set(false);
  }
  
  public updateCategoryName(newValue: string): void {
    this.categoryNameChange.emit(newValue);
  }
} 