import {Component, inject} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormArray,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {HlmCheckboxComponent} from '@spartan-ng/ui-checkbox-helm';
import {HlmInputDirective} from '@spartan-ng/ui-input-helm';
import {HlmLabelDirective} from '@spartan-ng/ui-label-helm';
import {AutomaticallyGeneratedGameForm} from './interfaces/automatically-generated-game.interface';
import {signal} from '@angular/core';
import {AutomaticallyGeneratedGameService} from './automatically-generated-game.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-automatically-generated-game',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmCheckboxComponent
  ],
  templateUrl: './automatically-generated-game.component.html',
  styleUrls: ['./automatically-generated-game.component.scss']
})
export class AutomaticallyGeneratedGameComponent {
  private automaticallyGeneratedGameService = inject(AutomaticallyGeneratedGameService);
  private router = inject(Router);

  public gameForm: FormGroup<{
    theme: FormControl<string | null>;
    categories: FormArray;
    details: FormControl<string | null>;
    exampleQuestions: FormControl<string | null>;
    allowImages: FormControl<boolean | null>;
    allowVideos: FormControl<boolean | null>;
  }>;
  public autoGenerateCategories: FormControl<boolean | null>;
  public newCategory = signal('');
  public maxCategories = 10;
  public minCategoryLength = 2;
  public maxCategoryLength = 30;
  public errorMessage = signal('');
  public isLoading = signal(false);

  constructor(private fb: FormBuilder) {
    this.autoGenerateCategories = this.fb.control(false);
    this.gameForm = this.fb.group({
      theme: [''],
      categories: this.fb.array([], [this.categoriesValidator()]),
      details: [''],
      exampleQuestions: [''],
      allowImages: [false],
      allowVideos: [false]
    });

    // Add example categories
    this.addInitialCategories();

    this.updateValidators();
  }

  private addInitialCategories(): void {
    const initialCategories = ['History', 'Science', 'Art', 'Geography', 'Sports'];
    initialCategories.forEach(category => {
      this.categories.push(this.fb.control(category));
    });
  }

  public get categories(): FormArray {
    return this.gameForm.get('categories') as FormArray;
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

  public addCategory(): void {
    this.errorMessage.set('');

    if (this.categories.length >= this.maxCategories) {
      this.errorMessage.set(`Maximum of ${this.maxCategories} categories allowed`);
      return;
    }

    const categoryName = this.newCategory().trim();

    if (!categoryName) {
      return;
    }

    if (categoryName.length < this.minCategoryLength) {
      this.errorMessage.set(`Category must be at least ${this.minCategoryLength} characters`);
      return;
    }

    if (this.categoryExists(categoryName)) {
      this.errorMessage.set('This category already exists');
      return;
    }

    this.categories.push(this.fb.control(categoryName));
    this.newCategory.set('');
    this.gameForm.markAsDirty();
  }

  public categoryExists(categoryName: string): boolean {
    return this.categories.controls.some(control => control.value.toLowerCase() === categoryName.toLowerCase());
  }

  public removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  public handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addCategory();
    }
  }

  private updateValidators(): void {
    if (this.autoGenerateCategories.value) {
      this.gameForm.get('theme')?.setValidators([Validators.required]);
      this.gameForm.get('categories')?.clearValidators();
    } else {
      this.gameForm.get('theme')?.clearValidators();
      this.gameForm.get('categories')?.setValidators([this.categoriesValidator()]);
    }

    this.gameForm.get('theme')?.updateValueAndValidity();
    this.gameForm.get('categories')?.updateValueAndValidity();
  }

  private categoriesValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const formArray = control as FormArray;
      if (formArray.length < 2) {
        return {categoriesCount: true};
      }
      return null;
    };
  }

  public getCategoriesError(): string {
    const errors = this.gameForm.get('categories')?.errors;
    if (errors?.['categoriesCount']) {
      return 'Must have at least 2 categories';
    }
    return '';
  }

  public onSubmit(): void {
    if (this.gameForm.valid) {
      this.isLoading.set(true);
      const formValue = {
        ...this.gameForm.value,
        categories: this.gameForm.value.categories as string[]
      } as AutomaticallyGeneratedGameForm;

      this.automaticallyGeneratedGameService.generateGame(formValue).subscribe({
        next: response => {
          if (response.success) {
            console.log('Generation started with ID:', response.generationId);
            this.pollGameGenerationStatus(response.generationId);
          } else {
            console.error('Failed to start game generation');
            this.isLoading.set(false);
          }
        },
        error: error => {
          console.error('Error starting game generation:', error);
          this.isLoading.set(false);
        }
      });
    } else {
      this.gameForm.markAllAsTouched();
    }
  }

  private pollGameGenerationStatus(generationId: string): void {
    this.automaticallyGeneratedGameService
      .pollGenerationStatus(generationId)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: response => {
          if (response.status === 'completed' && response.success) {
            console.log('Game generation completed:', response);
            this.router.navigate(['/game/edit', response.data.gameId]);
          } else if (response.status === 'failed' || !response.success) {
            console.error('Game generation failed:', response);
          }
        },
        error: error => {
          console.error('Error polling game generation status:', error);
        }
      });
  }
}
