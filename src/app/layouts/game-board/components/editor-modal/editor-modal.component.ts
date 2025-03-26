import {Component, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Question} from '../../interfaces/game-board.interfaces';
import {FormsModule} from '@angular/forms';
import {ContentChange, QuillEditorComponent, QuillModules} from 'ngx-quill';
import hljs from 'highlight.js';
import {GameBoardService} from '../../game-board.service';

@Component({
  selector: 'app-editor-modal',
  imports: [FormsModule, QuillEditorComponent],
  templateUrl: './editor-modal.component.html',
  styleUrl: './editor-modal.component.scss'
})
export class EditorModalComponent implements OnInit {
  public question = '';
  public answer = '';

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: {question: Question; category: string; categoryId: string},
    private gameBoardService: GameBoardService
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
    this.gameBoardService.updateQuestion(this.data.categoryId, this.data.question.id, this.question, this.answer);
    this.dialogRef.close();
  }
}
