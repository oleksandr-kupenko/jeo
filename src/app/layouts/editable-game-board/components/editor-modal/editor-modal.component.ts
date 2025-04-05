import {Component, Inject, OnInit, inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Question, QuestionUpdate} from '../../../game-board/interfaces/game-board.interfaces';
import {FormsModule} from '@angular/forms';
import {ContentChange, QuillEditorComponent, QuillModules} from 'ngx-quill';
import hljs from 'highlight.js';
import { EditableGameBoardService } from '../../editable-game-board.service';

@Component({
  selector: 'app-editor-modal',
  imports: [
    FormsModule,
    QuillEditorComponent
  ],
  templateUrl: './editor-modal.component.html',
  styleUrl: './editor-modal.component.scss'
})
export class EditorModalComponent implements OnInit {
  private readonly dialogRef = inject(DialogRef<Question>);
  private readonly editableGameBoardService = inject(EditableGameBoardService);
  
  public question = '';
  public answer = '';

  constructor(
    @Inject(DIALOG_DATA) public data: {question: Question; category: string; categoryId: string}
  ) {
    if (typeof hljs !== 'undefined') {
      // @ts-ignore
      window.hljs = hljs;
    }
  }

  ngOnInit() {
    this.question = this.data.question.question;
    this.answer = this.data.question.answer;
  }

  public handleUpdateData(value: ContentChange, type: 'answer' | 'question') {
    if (type === 'question') {
      //some logic
    } else if (type === 'answer') {
      //some logic
    }
  }

  public handleSave() {
    const questionUpdate: QuestionUpdate = {
      questionId: this.data.question.id,
      question: this.question,
      answer: this.answer,
      categoryId: this.data.categoryId,
      rowId: this.data.question.rowId
    }

    this.editableGameBoardService.updateQuestion(questionUpdate).subscribe(newQuestion => {
      this.dialogRef.close(newQuestion);
    });
  }
}
