import {Component, input, OnInit, signal} from '@angular/core';
import { Category, Question } from './interfaces/game-board.interfaces';
import { QuestionModalComponent } from './components/question-modal/question-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { GameBoardService } from './game-board.service';
import { TeamsComponent } from './components/teams/teams.component';
import { EditorModalComponent } from './components/editor-modal/editor-modal.component';
import {CurrentQuestionService} from "../../services/current-question.service";
import { CommonModule } from '@angular/common';
import { EditableCategoryComponent } from '../../components/editable-category/editable-category.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule, 
    EditableCategoryComponent,
    TeamsComponent
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  public categories = signal<Category[]>([]);

  public isEditMode = input<boolean>(false);

  constructor(
    private dialog: Dialog,
    private gameBoardService: GameBoardService,
    private currentQuestionService: CurrentQuestionService
  ) {}

  ngOnInit() {
    this.gameBoardService
      .getCategories()
      .subscribe((data) => this.categories.set(data));
  }

  onQuestionClick(category: Category, question: Question) {
    if (this.isEditMode()) {
      this.openQuestionEditor(category, question);
    } else {
      this.openQuestion(category, question);
    }
  }

  private openQuestion(category: Category, question: Question) {
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      width: '100vw',
      height: '100vh',
      data: {
        category: category.name,
        question: question,
      },
    });

    dialogRef.closed.subscribe(() => {
      question.isAnswered = true;
      this.gameBoardService.updateQuestionStatus(category.id, question.id);
      this.currentQuestionService.setCurrentQuestionPoints(null);
    });
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
    
    // Если нужно сохранить изменения на сервере
    this.gameBoardService.updateCategoryName(updatedCategories[index].id, newName);
  }
}
