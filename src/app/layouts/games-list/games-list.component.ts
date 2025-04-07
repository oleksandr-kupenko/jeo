import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import { EditableGameBoardService } from '../editable-game-board/editable-game-board.service';
import { Game } from '../game-board/interfaces/game-board.interfaces';
import { GameSessionService } from '../game-session/game-session.service';
import { SubHeaderComponent } from "../sub-header/sub-header.component";

@Component({
  selector: 'app-games-list',
  imports: [RouterLink, MatIcon, MatMiniFabButton, SubHeaderComponent],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements OnInit {
  private gameBoardService = inject(EditableGameBoardService);
  private gameSessionService = inject(GameSessionService);
  private router = inject(Router);
  
  public isSessions = signal(false);
  
  public gameList = signal<Game[]>([]);

  constructor() {}

  ngOnInit() {
    this.checkCurrentRoute();
    
    if (this.isSessions()) {
      this.gameBoardService.getAllGames().subscribe((games) => {
        this.gameList.set(games);
      });
    } else {
      this.gameBoardService.getAllGames().subscribe((games) => {
        this.gameList.set(games);
      });
    }

    
  }

  private checkCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.isSessions.set(currentUrl.includes('games/sessions'));
  }

  handleDeleteGame(gameId: string) {
    this.gameBoardService.deleteGame(gameId).subscribe(() => {
      this.gameList.set(this.gameList().filter((game) => game.id !== gameId));
    });
  }
}
