import {Component, input, output, signal, ElementRef, viewChild, effect} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-editable-title',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="title-header" [class.editing]="isEditing()" (click)="startEditing()">
      @if (isEditing()) {
        <input
          #titleInput
          type="text"
          [ngModel]="title()"
          (ngModelChange)="updateTitle($event)"
          (blur)="finishEditing()"
          (keydown.enter)="finishEditing()"
          class="title-input"
        />
      } @else {
        <div class="title-text w-full text-center">
          <span>
            {{ title() }}
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

    .title-header {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .title-text {
      width: 100%;
      text-align: center;
      font-weight: bold;
    }

    .title-input {
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
export class EditableTitleComponent {
  public title = input<string>('');
  public titleChange = output<string>();
  public isEditing = signal<boolean>(false);
  private titleInput = viewChild<ElementRef>('titleInput');

  private newTitle = signal<string>('');

  constructor() {
    effect(() => {
      if (this.isEditing() && this.titleInput()) {
        setTimeout(() => {
          this.titleInput()?.nativeElement?.focus();
        });
      }
    });
  }

  public startEditing(): void {
    this.isEditing.set(true);
    this.newTitle.set(this.title());
  }

  public finishEditing(): void {
    this.isEditing.set(false);
    if (this.newTitle()) {
      this.titleChange.emit(this.newTitle());
    }
  }

  public updateTitle(newValue: string): void {
    this.newTitle.set(newValue);
  }
}
