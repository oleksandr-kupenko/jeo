import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {HlmCheckboxComponent} from '@spartan-ng/ui-checkbox-helm';
import {HlmInputDirective} from '@spartan-ng/ui-input-helm';
import {HlmLabelDirective} from '@spartan-ng/ui-label-helm';
import {AutomaticallyGeneratedGameForm} from './interfaces/automatically-generated-game.interface';

@Component({
  selector: 'app-automatically-generated-game',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmCheckboxComponent
  ],
  templateUrl: './automatically-generated-game.component.html',
  styleUrls: ['./automatically-generated-game.component.scss']
})
export class AutomaticallyGeneratedGameComponent {
  public gameForm: FormGroup<{
    theme: FormControl<string | null>;
    categories: FormControl<string | null>;
    details: FormControl<string | null>;
    exampleQuestions: FormControl<string | null>;
    allowImages: FormControl<boolean | null>;
    allowVideos: FormControl<boolean | null>;
  }>;
  public autoGenerateCategories: FormControl<boolean | null>;

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

      const categories = control.value
        .split(',')
        .map((cat: string) => cat.trim())
        .filter((cat: string) => cat.length > 0);

      if (categories.length < 2 || categories.length > 10) {
        return {categoriesCount: true};
      }

      return null;
    };
  }

  public onSubmit(): void {
    if (this.gameForm.valid) {
      const formValue = this.gameForm.value as AutomaticallyGeneratedGameForm;
      console.log('Form submitted:', formValue);
    } else {
      this.gameForm.markAllAsTouched();
    }
  }
}
