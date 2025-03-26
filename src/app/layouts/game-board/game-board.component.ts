import {Component, OnInit, signal} from '@angular/core';
import {Category, Question} from './interfaces/game-board.interfaces';
import {QuestionModalComponent} from './components/question-modal/question-modal.component';
import {Dialog} from '@angular/cdk/dialog';
import {GameBoardService} from './game-board.service';
import {TeamsComponent} from './components/teams/teams.component';
import {CurrentQuestionService} from '../../services/current-question.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, TeamsComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  public categories = signal<Category[]>([]);

  constructor(
    private dialog: Dialog,
    private gameBoardService: GameBoardService,
    private currentQuestionService: CurrentQuestionService
  ) {}

  ngOnInit() {
    this.gameBoardService.getCategories().subscribe(data => this.categories.set(data));
  }

  onQuestionClick(category: Category, question: Question) {
    this.openQuestion(category, question);
  }

  private openQuestion(category: Category, question: Question) {
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      width: '100vw',
      height: '100vh',
      data: {
        category: category.name,
        question: question
      }
    });

    dialogRef.closed.subscribe(() => {
      //question.isAnswered = true;
      alert('need to update question status');
      this.gameBoardService.updateQuestionStatus(category.id, question.id);
      this.currentQuestionService.setCurrentQuestionPoints(null);
    });
  }
}
