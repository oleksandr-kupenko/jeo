import { Routes } from "@angular/router";
import { GameSessionComponent } from "./game-session.component";
import { GameBoardComponent } from "../game-board/game-board.component";
import { GamesListComponent } from "../games-list/games-list.component";
import { CreateGameSessionComponent } from "./components/create-game-session/create-game-session.component";
import { SessionListComponent } from "./components/sessions-list/sesions-list.component";

export const gameSessionRoutes: Routes = [
    {
        path: '',
        component: GameSessionComponent,
        children: [
            {
                path: '',
                component: SessionListComponent
            },
            {
                path: ':id',
                component: GameBoardComponent
            },
            {
                path: 'new/:id',
                component: CreateGameSessionComponent
            },
        ]
    }
]