import {Component, computed, HostListener, Inject, OnInit, signal} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {CurrentQuestionService} from '../../../../services/current-question.service';
import {Question} from '@core/interfaces/game.interfaces';

@Component({
  selector: 'app-question-modal',
  imports: [],
  templateUrl: './question-modal.component.html',
  styleUrl: './question-modal.component.scss',
  animations: [
    trigger('fadeInAnswer', [
      transition(':enter', [style({opacity: 0}), animate('2000ms ease-out', style({opacity: 1}))])
    ]),
    trigger('slideUpQuestion', [
      state('void', style({transform: 'translateY(0)'})),
      state('shown', style({transform: 'translateY(-20px)'})),
      transition('void => shown', [animate('300ms ease-out')])
    ])
  ]
})
export class QuestionModalComponent implements OnInit {
  isShowAnswer = signal(false);

  safeQuestion = computed<SafeHtml>(() => {
    return this.prepareText(this.question());
  });
  safeAnswer = computed<SafeHtml>(() => {
    return this.prepareText(this.answer());
  });

  private answer = signal('');
  private question = signal('');

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.handleClose();
    }
    if (event.code === 'Space') {
      event.preventDefault();
      this.handleShowAnswer();
    }
  }

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: {question: Question; category: string},
    private sanitizer: DomSanitizer,
    private currentQuestionService: CurrentQuestionService
  ) {}

  ngOnInit() {
    //this.currentQuestionService.setCurrentQuestionPoints(this.data.question.value);
    this.currentQuestionService.setCurrentQuestionPoints(0);
    this.question.set(this.data.question.question);
    this.answer.set(this.data.question.answer);
  }

  handleClose() {
    this.dialogRef.close();
  }

  handleShowAnswer() {
    this.isShowAnswer.set(true);
  }

  prepareText(str: string): SafeHtml {
    str = str.replace(/&nbsp;/g, ' ');
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }
}
