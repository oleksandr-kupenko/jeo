import {Component, computed, inject, OnInit, signal, Type} from '@angular/core';
import {Category, Game, Question, QuestionRow} from '../game-board/interfaces/game-board.interfaces';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Dialog} from '@angular/cdk/dialog';
import {GameBoardService} from '../game-board/game-board.service';
import {EditorModalComponent} from '../game-board/components/editor-modal/editor-modal.component';
import {EditableCategoryComponent} from '../../components/editable-category/editable-category.component';
import {MediaPreviewPipe} from './media-preview.pipe';
import {TruncateTextPipe} from './truncate-text.pipe';
import {ActivatedRoute} from '@angular/router';
import {EditablePointsComponent} from '../../components/editable-points/editable-points.component';

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
  private gameBoardService = inject(GameBoardService);
  private route = inject(ActivatedRoute);
  
  public game = signal<Game | null>(null);
  public categories = computed<Category[]>(() => this.game()?.categories ?? []);
  public questionRows = computed<QuestionRow[]>(() => 
    [...(this.game()?.questionRows ?? [])]
      .sort((a, b) => a.order - b.order)
  );

  private routeId!: string | null;

  public questionsMap = computed(() => {
    const map = new Map<string, Question>();
    this.questionRows().forEach(row => {
      row.questions.forEach(question => {
        const key = `${question.categoryId}_${row.value}`;
        map.set(key, question);
      });
    });
    return map;
  });

  public getQuestion = computed(() => {
    return (categoryId: string, value: number) => {
      return this.questionsMap()?.get(`${categoryId}_${value}`);
    };
  });

  ngOnInit() {
    this.routeId = this.route.snapshot.paramMap.get('id');

    if (this.routeId === 'new') {
      this.gameBoardService.createGame('TEST').subscribe(data => {
        console.log('data', data);
        this.game.set(data);
      });
    } else {
      this.gameBoardService.getGame(this.routeId!).subscribe(data => {
        console.log('data', data);
        this.game.set(data);
      });
    }

    // this.gameBoardService
    //   .getCategories()
    //   .subscribe((data) => this.categories.set(data));
  }

  public onPointsChange(rowId: string, newValue: number): void {
    console.log(`Points changed for row ${rowId} to ${newValue}`);
    this.gameBoardService.updateRowQuestionPoints(rowId, newValue).subscribe(data => {
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
      }
    });
  }

  updateCategoryName(index: number, newName: string): void {
    const updatedCategories = [...this.categories()];
    updatedCategories[index].name = newName;
    //this.categories.set(updatedCategories);

    this.gameBoardService.updateCategoryName(updatedCategories[index].id, newName);
  }
}
