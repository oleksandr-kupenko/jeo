import { Component, OnInit, signal } from '@angular/core';
import { Category, Question } from '../game-board/interfaces/game-board.interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { GameBoardService } from '../game-board/game-board.service';
import { EditorModalComponent } from '../game-board/components/editor-modal/editor-modal.component';
import { EditableCategoryComponent } from '../../components/editable-category/editable-category.component';

@Component({
  selector: 'app-editable-game-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EditableCategoryComponent
  ],
  templateUrl: './editable-game-board.component.html',
  styleUrl: './editable-game-board.component.scss'
})
export class EditableGameBoardComponent implements OnInit {
  public categories = signal<Category[]>([]);

  constructor(
    private dialog: Dialog,
    private gameBoardService: GameBoardService
  ) {}

  ngOnInit() {
    this.gameBoardService
      .getCategories()
      .subscribe((data) => this.categories.set(data));
  }

  onQuestionClick(category: Category, question: Question) {
    this.openQuestionEditor(category, question);
  }

  private openQuestionEditor(category: Category, question: Question) {
    const dialogRef = this.dialog.open(EditorModalComponent, {
      width: '1000px',
      height: '450px',
      maxWidth: '90%',
      maxHeight: '90%',
      data: {
        category: category.name,
        question: question,
        categoryId: category.id
      },
    });
  }

  updateCategoryName(index: number, newName: string): void {
    const updatedCategories = [...this.categories()];
    updatedCategories[index].name = newName;
    this.categories.set(updatedCategories);
    
    this.gameBoardService.updateCategoryName(updatedCategories[index].id, newName);
  }
}
