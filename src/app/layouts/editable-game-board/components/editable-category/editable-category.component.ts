import {Component, input, output, signal, ElementRef, viewChild, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-editable-category',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="category-header" [class.editing]="isEditing()" (click)="startEditing()">
      @if (isEditing()) {
        <input
          #categoryInput
          type="text"
          [ngModel]="categoryName()"
          (ngModelChange)="updateCategoryName($event)"
          (blur)="finishEditing()"
          (keydown.enter)="finishEditing()"
          class="category-input"
        />
      } @else {
        <div class="category-text w-full text-center">
          <span>
            {{ categoryName() }}
          </span>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      width: 100%;
      height: 100%;
    }

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
  private categoryInput = viewChild<ElementRef>('categoryInput');

  private newName = signal<string>('');

  constructor() {
    effect(() => {
      if (this.isEditing() && this.categoryInput()) {
        setTimeout(() => {
          this.categoryInput()?.nativeElement?.focus();
        });
      }
    });
  }

  public startEditing(): void {
    this.isEditing.set(true);
    this.newName.set(this.categoryName());
  }

  public finishEditing(): void {
    this.isEditing.set(false);
    if (this.newName()) {
      this.categoryNameChange.emit(this.newName());
    }
  }

  public updateCategoryName(newValue: string): void {
    this.newName.set(newValue);
  }
}
