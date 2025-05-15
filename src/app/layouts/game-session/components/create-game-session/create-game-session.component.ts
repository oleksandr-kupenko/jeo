import {CommonModule} from '@angular/common';
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  NonNullableFormBuilder,
  FormControl
} from '@angular/forms';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {HlmInputDirective} from '@spartan-ng/ui-input-helm';
import {HlmLabelDirective} from '@spartan-ng/ui-label-helm';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router} from '@angular/router';
import {GameSessionService} from '../../game-session.service';
import {NewGameSessionParams} from '../../interfaces/game-session.interface';
import {SubHeaderComponent} from '../../../sub-header/sub-header.component';
import {EditableTitleComponent} from '../../../editable-game-board/components/editable-title/editable-title.component';

interface GameSessionFormControls {
  name: FormControl<string>;
  playerCount: FormControl<number>;
  aiPlayerCount: FormControl<number>;
  timer: FormControl<number>;
}

@Component({
  selector: 'app-create-game-session',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    SubHeaderComponent,
    EditableTitleComponent
  ],
  template: `
    <app-sub-header [backUrl]="'games/list'">
      <div class="current-game-title">
        <app-editable-title [title]="'Start new session game'" />
      </div>
    </app-sub-header>
    <div class="flex items-center justify-center min-h-screen flex-col p-6 text-white">
      <div class="w-full max-w-md border-2 border-gray-700 p-6 rounded-lg">
        <form [formGroup]="sessionForm" (ngSubmit)="onSubmit()" class="w-full">
          <div class="mb-6">
            <label hlmLabel class="block text-sm font-medium mb-1">Name</label>
            <input hlmInput formControlName="name" class="w-full" placeholder="Game alias" />
            <p class="text-xs text-gray-400 mt-1">
              This is not the title of the game. It's alias, what can see only you. It's will help to continue or start
              the game late. You can finde it in the started games list.
            </p>
          </div>

          <div class="mb-6 relative">
            <label hlmLabel class="block text-sm font-medium mb-1">Number of players</label>
            <input
              hlmInput
              type="number"
              formControlName="playerCount"
              class="w-full"
              placeholder="Enter number of players"
              min="2"
              max="10"
            />
            <div class="absolute -bottom-5 left-0">
              @if (sessionForm.get('playerCount')?.errors?.['required'] && sessionForm.get('playerCount')?.touched) {
                <p class="text-red-500 text-xs">Number of players is required</p>
              }
              @if (sessionForm.get('playerCount')?.errors?.['min'] && sessionForm.get('playerCount')?.touched) {
                <p class="text-red-500 text-xs">Minimum 2 players required</p>
              }
              @if (sessionForm.get('playerCount')?.errors?.['max'] && sessionForm.get('playerCount')?.touched) {
                <p class="text-red-500 text-xs">Maximum 10 players allowed</p>
              }
            </div>
          </div>

          <div class="mb-6 relative mt-8">
            <label hlmLabel class="block text-sm font-medium mb-1">Number of AI players including</label>
            <input
              hlmInput
              type="number"
              formControlName="aiPlayerCount"
              class="w-full"
              placeholder="Enter number of AI players"
              min="0"
            />
            <div class="absolute -bottom-5 left-0">
              @if (
                sessionForm.get('aiPlayerCount')?.errors?.['required'] && sessionForm.get('aiPlayerCount')?.touched
              ) {
                <p class="text-red-500 text-xs">Number of AI players is required</p>
              }
              @if (sessionForm.get('aiPlayerCount')?.errors?.['min'] && sessionForm.get('aiPlayerCount')?.touched) {
                <p class="text-red-500 text-xs">Minimum 0 AI players required</p>
              }
              @if (
                sessionForm.get('aiPlayerCount')?.errors?.['exceedsPlayerCount'] &&
                sessionForm.get('aiPlayerCount')?.touched
              ) {
                <p class="text-red-500 text-xs">Number of AI players cannot exceed total players</p>
              }
            </div>
          </div>

          <div class="mb-6 relative mt-8">
            <label hlmLabel class="block text-sm font-medium mb-1">Timer for answer</label>
            <input hlmInput type="number" formControlName="timer" class="w-full" placeholder="Time in seconds" />
            <p class="text-xs text-gray-400 mt-1">5 - 120 sec. 0 - no timer. In original Jeopardy game it's 5 sec.</p>
            <div class="absolute -bottom-5 left-0">
              @if (sessionForm.get('timer')?.errors?.['required'] && sessionForm.get('timer')?.touched) {
                <p class="text-red-500 text-xs">Timer is required</p>
              }
              @if (sessionForm.get('timer')?.errors?.['min'] && sessionForm.get('timer')?.touched) {
                <p class="text-red-500 text-xs">Timer must be 0 or higher</p>
              }
              @if (sessionForm.get('timer')?.errors?.['max'] && sessionForm.get('timer')?.touched) {
                <p class="text-red-500 text-xs">Timer cannot exceed 120 seconds</p>
              }
            </div>
          </div>

          <div class="flex justify-between mt-12">
            <button type="button" hlmBtn class="bg-gray-700 text-white hover:bg-gray-600" (click)="onCancel()">
              Cancel
            </button>
            <button
              type="submit"
              hlmBtn
              class="bg-primary text-primary-foreground hover:bg-primary/90"
              [disabled]="sessionForm.invalid"
            >
              Start Game
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      button[disabled] {
        opacity: 0.5;
        pointer-events: none;
      }
    `
  ]
})
export class CreateGameSessionComponent implements OnInit {
  public sessionForm!: FormGroup<GameSessionFormControls>;
  private gameSessionService = inject(GameSessionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(NonNullableFormBuilder);

  private gameId!: string;

  constructor() {}

  public ngOnInit(): void {
    this.initializeForm();
    this.gameId = this.route.snapshot.paramMap.get('id')!;

    // Update AI player validation when player count changes
    this.sessionForm.controls.playerCount.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.sessionForm.controls.aiPlayerCount.updateValueAndValidity();
    });
  }

  private aiPlayerCountValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const aiPlayerCount = control.value;
      const playerCount = control.parent.get('playerCount')?.value;

      if (aiPlayerCount > playerCount) {
        return {exceedsPlayerCount: true};
      }

      return null;
    };
  }

  public onSubmit(): void {
    if (this.sessionForm.valid) {
      console.log('Session form submitted:', this.sessionForm.value);

      const gameSessionParams: NewGameSessionParams = {
        gameId: this.gameId,
        name: this.sessionForm.controls.name.value,
        numberOfPlayers: this.sessionForm.controls.playerCount.value,
        numberOfAiPlayers: this.sessionForm.controls.aiPlayerCount.value,
        defaultTimer: this.sessionForm.controls.timer.value
      };

      this.gameSessionService.createGameSession(gameSessionParams).subscribe(gameSession => {
        console.log('Game session created:', gameSession);
        this.router.navigate([`/game/session/${gameSession.id}`]);
      });
    } else {
      this.sessionForm.markAllAsTouched();
    }
  }

  public onCancel(): void {
    console.log('Form canceled');
  }

  private initializeForm(): void {
    this.sessionForm = this.formBuilder.group({
      name: this.formBuilder.control('', {validators: Validators.required}),
      playerCount: this.formBuilder.control(3, {
        validators: [Validators.required, Validators.min(2), Validators.max(10)]
      }),
      aiPlayerCount: this.formBuilder.control(0, {
        validators: [Validators.required, Validators.min(0), this.aiPlayerCountValidator()]
      }),
      timer: this.formBuilder.control(5, {validators: [Validators.required, Validators.min(5), Validators.max(120)]})
    });
  }
}
