import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-games-list',
  imports: [RouterLink, MatIcon, MatMiniFabButton],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {
  gameList = signal([
    {name: 'Game 1', id: 1},
    {name: 'Game 2', id: 2},
    {name: 'Game 3', id: 3}
  ]);
}
