import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-automatically-generated-game',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmCheckboxComponent,
  ],
  template: `
    <div class="flex items-center justify-center min-h-screen flex-col p-6 text-white">
      <h2 class="text-2xl font-bold mb-6">AI Game Generation</h2>
      
      <form [formGroup]="gameForm" (ngSubmit)="onSubmit()" class="w-full max-w-2xl">
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <hlm-checkbox 
              [formControl]="autoGenerateCategories"
              (click)="toggleAutoGenerate()"
              class="mr-2">
            </hlm-checkbox>
            <span class="text-sm">Auto-generate categories</span>
          </div>
          <div class="text-sm text-muted-foreground mt-1">
            @if (autoGenerateCategories.value) {
              <span class="text-xs text-gray-400">Categories will be generated automatically. Main Theme is required.</span>
            } @else {
              <span class="text-xs text-gray-400">You need to specify categories manually. Main Theme is optional.</span>
            }
          </div>
        </div>

        <div class="mb-4 relative pb-6">
          <label hlmLabel class="block text-sm font-medium mb-1">
            Categories <span class="text-red-500">*</span>
          </label>
          <input 
            hlmInput
            formControlName="categories" 
            [class]="'w-full ' + (autoGenerateCategories.value ? 'opacity-50' : '')"
            [attr.disabled]="autoGenerateCategories.value ? true : null"
            placeholder="History, Science, Art, Geography, Sports">
          @if (gameForm.get('categories')?.invalid && (gameForm.get('categories')?.dirty || gameForm.get('categories')?.touched)) {
            <div class="text-red-500 text-sm mt-1 absolute">
              @if (gameForm.get('categories')?.errors?.['required']) {
                <span>Categories are required</span>
              }
              @if (gameForm.get('categories')?.errors?.['categoriesCount']) {
                <span>Must have between 2 and 10 categories</span>
              }
            </div>
          }
        </div>

        <div class="mb-4 relative pb-6">
          <label hlmLabel class="block text-sm font-medium mb-1">
            Main Theme <span class="text-red-500" *ngIf="autoGenerateCategories.value">*</span>
          </label>
          <input 
            hlmInput
            formControlName="theme" 
            class="w-full"
            placeholder="Enter the main theme for the game">
          @if (gameForm.get('theme')?.invalid && (gameForm.get('theme')?.dirty || gameForm.get('theme')?.touched)) {
            <div class="text-red-500 text-sm mt-1 absolute">
              <span>Theme is required when auto-generating categories</span>
            </div>
          }
        </div>
        
        <div class="mb-4">
          <label hlmLabel class="block text-sm font-medium mb-1">Details (optional)</label>
          <textarea 
            hlmInput
            formControlName="details"
            class="w-full h-24 min-h-[80px]"
            placeholder="Additional details for question generation"></textarea>
        </div>
        
        <div class="mb-4">
          <label hlmLabel class="block text-sm font-medium mb-1">Example Questions (optional)</label>
          <textarea 
            hlmInput
            formControlName="exampleQuestions"
            class="w-full h-24 min-h-[80px]"
            placeholder="Example questions to better understand the style"></textarea>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-2">Settings</h3>
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <hlm-checkbox formControlName="allowImages" class="mr-2"></hlm-checkbox>
              <span>Allow images</span>
            </div>
            <div class="flex items-center">
              <hlm-checkbox formControlName="allowVideos" class="mr-2"></hlm-checkbox>
              <span>Allow videos</span>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          hlmBtn 
          class="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          [disabled]="gameForm.invalid">
          Generate Game
        </button>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
    
    ::placeholder {
      opacity: 0.5;
    }
    
    .relative {
      position: relative;
    }
    
    .absolute {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    
    button[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
    
    button[type="submit"] {
      background-color: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      height: 2.5rem;
      padding: 0.5rem 1rem;
      transition-property: color, background-color, border-color;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }
    
    button[type="submit"]:hover:not([disabled]) {
      background-color: hsl(var(--primary) / 0.9);
    }
  `]
})
export class AutomaticallyGeneratedGameComponent {
  public gameForm: FormGroup;
  public autoGenerateCategories;

  constructor(private fb: FormBuilder) {
    this.autoGenerateCategories = this.fb.control(false);
    this.gameForm = this.fb.group({
      theme: [''],
      categories: ['', [this.categoriesValidator()]],
      details: [''],
      exampleQuestions: [''],
      allowImages: [false],
      allowVideos: [false]
    });

    this.updateValidators();
  }

  public toggleAutoGenerate(): void {
    setTimeout(() => {
      this.updateValidators();
      
      if (this.autoGenerateCategories.value) {
        this.gameForm.get('categories')?.disable();
      } else {
        this.gameForm.get('categories')?.enable();
      }
    });
  }

  private updateValidators(): void {
    if (this.autoGenerateCategories.value) {
      this.gameForm.get('theme')?.setValidators([Validators.required]);
      this.gameForm.get('categories')?.clearValidators();
    } else {
      this.gameForm.get('theme')?.clearValidators();
      this.gameForm.get('categories')?.setValidators([Validators.required, this.categoriesValidator()]);
    }
    
    this.gameForm.get('theme')?.updateValueAndValidity();
    this.gameForm.get('categories')?.updateValueAndValidity();
  }

  private categoriesValidator() {
    return (control: any) => {
      if (!control.value) {
        return null;
      }
      
      const categories = control.value.split(',')
        .map((cat: string) => cat.trim())
        .filter((cat: string) => cat.length > 0);
      
      if (categories.length < 2 || categories.length > 10) {
        return { categoriesCount: true };
      }
      
      return null;
    };
  }

  public onSubmit(): void {
    if (this.gameForm.valid) {
      console.log('Form submitted:', this.gameForm.value);
    } else {
      this.gameForm.markAllAsTouched();
    }
  }
}