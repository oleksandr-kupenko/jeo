import {Component, computed, inject, OnInit, signal, HostListener, AfterViewInit, ElementRef} from '@angular/core';
import {QuestionModalComponent} from './components/question-modal/question-modal.component';
import {Dialog} from '@angular/cdk/dialog';
import {PlayersComponent} from './components/players/players.component';
import {CurrentQuestionService} from '../../services/current-question.service';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {GameSessionService} from '../game-session/game-session.service';
import {Category, Game, Question, QuestionRow} from '@core/interfaces/game.interfaces';
import {GameSession} from '@core/interfaces/game-session.interfaces';

interface CellData {
  question?: Question;
  category: Category;
  rowValue: number;
  isEmpty: boolean;
  isAnswered: boolean;
}

interface BoardRow {
  id: string;
  value: number;
  cells: CellData[];
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, PlayersComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, AfterViewInit {
  private dialog = inject(Dialog);
  private gameSessionService = inject(GameSessionService);
  private currentQuestionService = inject(CurrentQuestionService);
  private route = inject(ActivatedRoute);
  private elementRef = inject(ElementRef);

  public game = signal<Game | null>(null);
  public categories = computed<Category[]>(() => this.game()?.categories?.sort((a, b) => a.order - b.order) ?? []);
  public questionRows = computed<QuestionRow[]>(() =>
    [...(this.game()?.questionRows ?? [])].sort((a, b) => a.order - b.order)
  );

  // Готовая структура данных для доски
  public boardRows = computed<BoardRow[]>(() => {
    const game = this.game();
    const questionRows = this.questionRows();
    const categories = this.categories();

    if (!game || !questionRows || !categories || !questionRows.length || !categories.length) {
      return [];
    }

    // Диагностическое логирование
    console.log('Game:', game);
    console.log('Categories count:', categories.length);
    console.log('QuestionRows count:', questionRows.length);

    // Создаем словарь всех вопросов для быстрого доступа
    const allQuestions = new Map<string, Question>();

    // Собираем все вопросы из категорий (как в editable-game-board)
    categories.forEach(category => {
      if (category.questions && Array.isArray(category.questions)) {
        category.questions.forEach(question => {
          if (question) {
            allQuestions.set(`${question.categoryId}_${question.rowId}`, question);
          }
        });
      }
    });

    console.log('Total questions from categories:', allQuestions.size);

    // После вычисления новых данных запланируем обновление размеров доски
    setTimeout(() => this.adjustBoardHeight(), 0);

    return questionRows.map(row => {
      // Если нет строки, возвращаем пустую
      if (!row) return {id: '', value: 0, cells: []};

      // Создаем ячейки для каждой категории
      const cells = categories.map(category => {
        // Если нет категории, возвращаем пустую ячейку
        if (!category) {
          return {
            category: {} as Category,
            rowValue: 0,
            isEmpty: true,
            isAnswered: false
          } as CellData;
        }

        // Ищем вопрос для текущей категории и строки
        // Пробуем сначала найти в массиве вопросов строки
        let question: Question | undefined = undefined;

        // 1. Попытка найти в questions внутри row
        if (row.questions && Array.isArray(row.questions)) {
          question = row.questions.find(q => q && q.categoryId === category.id);
        }

        // 2. Если не нашли, ищем в нашем общем словаре вопросов из категорий
        if (!question) {
          question = allQuestions.get(`${category.id}_${row.id}`);
        }

        // 3. Если все еще не нашли, ищем в категории по rowId
        if (!question && category.questions && Array.isArray(category.questions)) {
          question = category.questions.find(q => q && q.rowId === row.id);
        }

        return {
          question,
          category,
          rowValue: row.value || 0,
          isEmpty: !question || !question.question || !question.answer,
          isAnswered: !!question?.answeredByUserId
        } as CellData;
      });

      return {
        id: row.id || '',
        value: row.value || 0,
        cells
      };
    });
  });

  @HostListener('window:resize')
  public onResize(): void {
    this.adjustBoardHeight();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.adjustBoardHeight(), 100);
  }

  private adjustBoardHeight(): void {
    const gameBoardEl = this.elementRef.nativeElement.querySelector('.game-board');
    if (!gameBoardEl) return;

    const containerHeight = this.elementRef.nativeElement.querySelector('.game-container').offsetHeight;
    const titleHeight = this.elementRef.nativeElement.querySelector('.game-title').offsetHeight;
    const playersEl = this.elementRef.nativeElement.querySelector('app-players');
    const playersHeight = playersEl ? playersEl.offsetHeight : 0;

    // Учитываем отступы и границы
    const padding = 40; // суммарные отступы (верх + низ)
    const availableHeight = containerHeight - titleHeight - playersHeight - padding;

    if (availableHeight <= 0) {
      console.warn('Not enough available height for the game board');
      return;
    }

    // Находим все ячейки и устанавливаем им минимальную высоту
    const categoryEls = gameBoardEl.querySelectorAll('.category');
    const cellEls = gameBoardEl.querySelectorAll('.cell');

    // Количество рядов (категории + вопросы)
    const rowCount = this.questionRows().length + 1;

    if (rowCount <= 1) {
      console.warn('Not enough rows to calculate height');
      return;
    }

    // Вычисляем высоту ячейки с учетом промежутков
    const gapSize = window.innerWidth <= 768 ? 5 : 10; // размер промежутка между ячейками
    const totalGapHeight = (rowCount - 1) * gapSize;

    // Вычисляем высоту ячейки
    let cellHeight = Math.floor((availableHeight - totalGapHeight) / rowCount);

    // Устанавливаем минимальную и максимальную высоту
    const minHeight = window.innerWidth <= 480 ? 30 : window.innerWidth <= 768 ? 40 : 50;
    const maxHeight = 150; // Максимальная высота для предотвращения слишком больших ячеек

    cellHeight = Math.max(minHeight, Math.min(maxHeight, cellHeight));

    // Применяем высоту к категориям и ячейкам
    categoryEls.forEach((el: Element) => ((el as HTMLElement).style.height = `${cellHeight}px`));
    cellEls.forEach((el: Element) => ((el as HTMLElement).style.height = `${cellHeight}px`));

    console.log(
      `Adjusted board: container=${containerHeight}, title=${titleHeight}, players=${playersHeight}, cell=${cellHeight}, availableHeight=${availableHeight}, rowCount=${rowCount}`
    );
  }

  public ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId) {
      this.gameSessionService.getGameSession(routeId).subscribe({
        next: (data: GameSession) => {
          console.log('Game session data loaded:', data);
          if (data && data.game) {
            console.log('Game data structure:', JSON.stringify(data.game, null, 2));
            const preparedGame = this.prepareGameData(data.game);
            this.game.set(preparedGame);
            // После получения данных игры вызовем расчет высоты ячеек
            setTimeout(() => this.adjustBoardHeight(), 100);
          } else {
            console.error('Received invalid game data:', data);
          }
        },
        error: error => {
          console.error('Error loading game session:', error);
        }
      });
    } else {
      console.error('No game ID provided in route');
    }
  }

  // Подготовка данных игры - убедимся, что все необходимые свойства существуют
  private prepareGameData(game: Game): Game {
    // Копируем объект для безопасности модификаций
    const result = {...game};

    // Убедимся, что категории существуют и имеют массивы вопросов
    if (!result.categories) {
      result.categories = [];
    } else {
      result.categories = result.categories.map(category => ({
        ...category,
        questions: category.questions || []
      }));
    }

    // Убедимся, что строки вопросов существуют и имеют массивы вопросов
    if (!result.questionRows) {
      result.questionRows = [];
    } else {
      result.questionRows = result.questionRows.map(row => ({
        ...row,
        questions: row.questions || []
      }));
    }

    return result;
  }

  public onQuestionClick(category: Category, question: Question) {
    if (!question || question?.answeredByUserId) return;

    this.openQuestion(category, question);
  }

  private openQuestion(category: Category, question: Question) {
    if (!category || !question) return;

    this.currentQuestionService.setCurrentQuestionPoints(
      question?.rowId ? this.questionRows().find(row => row?.id === question.rowId)?.value || 0 : 0
    );

    const dialogRef = this.dialog.open(QuestionModalComponent, {
      width: '100vw',
      height: '100vh',
      data: {
        category: category.name,
        question: question
      }
    });

    dialogRef.closed.subscribe(() => {
      this.gameSessionService.updateQuestionStatus(question.id).subscribe({
        next: (updatedQuestion: Question) => {
          console.log('Question marked as answered:', updatedQuestion);

          this.game.update(currentGame => {
            if (!currentGame) return currentGame;

            // Обновляем вопрос в категориях
            const updatedCategories = currentGame.categories?.map(category => {
              if (!category.questions) return category;

              return {
                ...category,
                questions: category.questions.map(q =>
                  q.id === question.id ? {...q, answeredByUserId: updatedQuestion.answeredByUserId} : q
                )
              };
            });

            // Обновляем вопрос в строках вопросов
            const updatedQuestionRows = currentGame.questionRows?.map(row => {
              if (!row.questions) return row;

              return {
                ...row,
                questions: row.questions.map(q =>
                  q.id === question.id ? {...q, answeredByUserId: updatedQuestion.answeredByUserId} : q
                )
              };
            });

            return {
              ...currentGame,
              categories: updatedCategories,
              questionRows: updatedQuestionRows
            };
          });
        },
        error: error => console.error('Error updating question status:', error)
      });

      this.currentQuestionService.setCurrentQuestionPoints(null);
    });
  }
}
