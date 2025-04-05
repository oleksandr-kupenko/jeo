import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, Game, Question, QuestionRow, QuestionUpdatedResponse } from '../game-board/interfaces/game-board.interfaces';
import { EditableCategoryComponent } from './components/editable-category/editable-category.component';
import { EditablePointsComponent } from './components/editable-points/editable-points.component';
import { EditorModalComponent } from './components/editor-modal/editor-modal.component';
import { EditableGameBoardService } from './editable-game-board.service';
import { MediaPreviewPipe } from './media-preview.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

interface CellData {
  question?: Question;
  category: Category;
  rowValue: number;
  isEmpty: boolean;
}

interface BoardRow {
  id: string;
  value: number;
  cells: CellData[];
}

@Component({
  selector: 'app-editable-game-board',
  standalone: true,
  imports: [ 
    FormsModule, 
    EditableCategoryComponent, 
    MediaPreviewPipe, 
    TruncateTextPipe,
    EditablePointsComponent
  ],
  templateUrl: './editable-game-board.component.html',
  styleUrl: './editable-game-board.component.scss'
})
export class EditableGameBoardComponent implements OnInit {
  private dialog = inject(Dialog);
  private editableGameBoardService = inject(EditableGameBoardService);
  private route = inject(ActivatedRoute);
  
  public game = signal<Game | null>(null);
  public categories = computed<Category[]>(() => this.game()?.categories!.sort((a, b) => a.order - b.order) ?? []);
  public questionRows = computed<QuestionRow[]>(() => 
    [...(this.game()?.questionRows ?? [])]
      .sort((a, b) => a.order - b.order)
  );

  // Готовая структура данных для доски
  public boardRows = computed<BoardRow[]>(() => {
    if (!this.game() || !this.questionRows().length || !this.categories().length) {
      return [];
    }

    // Создаем словарь для быстрого доступа к вопросам
    const questionsMap = new Map<string, Question>();
    this.questionRows().forEach(row => {
      row.questions.forEach(question => {
        questionsMap.set(question.id, question);
      });
    });

    // Создаем строки игрового поля
    return this.questionRows().map(row => {
      // Создаем ячейки для каждой категории в этой строке
      const cells = this.categories().map(category => {
        const question = row.questions.find(q => q.categoryId === category.id);
        
        return {
          question,
          category,
          rowValue: row.value,
          isEmpty: !question || !question.question || !question.answer
        } as CellData;
      });

      return {
        id: row.id,
        value: row.value,
        cells
      };
    });
  });

  private routeId!: string | null;

  ngOnInit() {
    this.routeId = this.route.snapshot.paramMap.get('id');

    if (this.routeId === 'new') {
      this.editableGameBoardService.createGame('New Game').subscribe(data => {
        console.log('data', data);
        this.game.set(data);
      });
    } else {
      this.editableGameBoardService.getGame(this.routeId!).subscribe(data => {
        console.log('data', data);
        this.game.set(data);
      });
    }
  }

  public onPointsChange(rowId: string, newValue: number): void {
    console.log(`Points changed for row ${rowId} to ${newValue}`);
    this.editableGameBoardService.updateRowQuestionPoints(rowId, newValue).subscribe(data => {
      console.log('data', data);
      const currentGame = this.game();
      if (!currentGame?.questionRows) return;
      
      this.game.update(game => ({
        ...currentGame,
        questionRows: currentGame!.questionRows!.map(row => 
          row.id === rowId ? {...row, value: newValue} : row
        )
      }));
    });
  }

  public onQuestionClick(category: Category, question: Question) {
    this.openQuestionEditor(category, question);
  }

  private openQuestionEditor(category: Category, question: Question) {
    const dialogRef: DialogRef<QuestionUpdatedResponse, EditorModalComponent> = this.dialog.open(EditorModalComponent, {
      width: '1000px',
      height: '450px',
      maxWidth: '90%',
      maxHeight: '90%',
      data: {
        category: category.name,
        question: question,
        categoryId: category.id
      }
    });

    dialogRef.closed.subscribe((updatedQuestion: QuestionUpdatedResponse | undefined) => {
      if (!updatedQuestion) return;

      this.game.update(currentGame => {
        if (!currentGame?.categories || !currentGame?.questionRows) return currentGame;

        // Обновляем категории
        const updatedCategories = currentGame.categories.map(category => {
          if (category.id !== updatedQuestion.category.id) return category;

          return {
            ...category,
            questions: category.questions.map(question => 
              question.id === updatedQuestion.id ? updatedQuestion : question
            )
          };
        });

        // Обновляем строки вопросов
        const updatedQuestionRows = currentGame.questionRows.map(row => {
          if (row.id !== updatedQuestion.questionRow.id) return row;

          return {
            ...row,
            questions: row.questions.map(question => 
              question.id === updatedQuestion.id ? updatedQuestion : question
            )
          };
        });

        // Возвращаем обновленный объект игры
        return {
          ...currentGame,
          categories: updatedCategories,
          questionRows: updatedQuestionRows
        };
      });
    });
  }

  public updateCategoryName(id: string, newName: string): void {
    this.editableGameBoardService.updateCategoryName(id, {name: newName}).subscribe((updatedCategory) => {
      const currentGame = this.game();
      if (!currentGame || !currentGame.categories) return;
      
      this.game.set({
        ...currentGame,
        categories: currentGame.categories.map(category => 
          category.id === id ? updatedCategory : category
        )
      });
    });
  }
}
