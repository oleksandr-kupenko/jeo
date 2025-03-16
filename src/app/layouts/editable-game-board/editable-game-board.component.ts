import { Component } from '@angular/core';
import { GameBoardComponent } from "../game-board/game-board.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-game-board',
  standalone: true,
  imports: [
    GameBoardComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './editable-game-board.component.html',
  styleUrl: './editable-game-board.component.scss'
})
export class EditableGameBoardComponent {

}
