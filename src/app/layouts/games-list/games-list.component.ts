import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import { EditableGameBoardService } from '../editable-game-board/editable-game-board.service';
import { Game } from '../game-board/interfaces/game-board.interfaces';

@Component({
  selector: 'app-games-list',
  imports: [RouterLink, MatIcon, MatMiniFabButton],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements OnInit {
  private gameBoardService = inject(EditableGameBoardService);
  public gameList = signal<Game[]>([]);

  constructor() {}

  ngOnInit() {
    this.gameBoardService.getAllGames().subscribe((games) => {
      this.gameList.set(games);
    });
  }

  handleDeleteGame(gameId: string) {
    this.gameBoardService.deleteGame(gameId).subscribe(() => {
      this.gameList.set(this.gameList().filter((game) => game.id !== gameId));
    });
  }
}
