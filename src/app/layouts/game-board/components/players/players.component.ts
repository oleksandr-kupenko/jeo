import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {debounceTime, Subject} from 'rxjs';
import {CurrentQuestionService} from '../../../../services/current-question.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {MOCK_PLAYERS} from '../../mock/players.mock';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit {
  public players = signal<any[]>([]);

  private updatePlayerTrigger = new Subject<void>();

  private currentQuestionService = inject(CurrentQuestionService);
  public currentPoints = toSignal(this.currentQuestionService.getCurrentQuestionPoints());

  constructor() {}

  public ngOnInit(): void {
    // Инициализация с мок-данными
    this.players.set(MOCK_PLAYERS);
  }

  public handleUpdatePlayers() {
    this.updatePlayerTrigger.next();
  }

  public handleIncreasePoints(id: string) {
    const currentPointsValue = this.currentPoints() || 0;
    
    this.players.update(players => 
      players.map(player => {
        if (player.id === id) {
          return {
            ...player,
            points: player.points + currentPointsValue
          };
        }
        return player;
      })
    );
  }

  public handleDecreasePoints(id: string) {
    const currentPointsValue = this.currentPoints() || 0;
    
    this.players.update(players => 
      players.map(player => {
        if (player.id === id) {
          return {
            ...player,
            points: player.points - currentPointsValue
          };
        }
        return player;
      })
    );
  }
} 