import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {GameSessionService} from '../../game-session.service';
import {SubHeaderComponent} from '../../../sub-header/sub-header.component';
import {GameSession} from '@core/interfaces/game-session.interfaces';

@Component({
  selector: 'app-games-list',
  imports: [RouterLink, MatIcon, MatMiniFabButton, SubHeaderComponent],
  templateUrl: './sesions-list.component.html',
  styleUrl: './sesions-list.component.scss'
})
export class SessionListComponent implements OnInit {
  private gameSessionService = inject(GameSessionService);
  private router = inject(Router);

  public isSessions = signal(false);

  public sessionList = signal<GameSession[]>([]);

  constructor() {}

  ngOnInit() {
    this.gameSessionService.getAllGameSessions().subscribe(sessions => {
      console.log('LIST', sessions);
      this.sessionList.set(sessions);
    });
  }

  handleDeleteSession(gameId: string) {}
}
