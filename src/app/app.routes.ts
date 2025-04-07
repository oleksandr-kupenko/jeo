import {Routes} from '@angular/router';
import {GameBoardComponent} from './layouts/game-board/game-board.component';
import {EditableGameBoardComponent} from './layouts/editable-game-board/editable-game-board.component';
import {GamesListComponent} from './layouts/games-list/games-list.component';
import {authGuard} from './core/guards/auth.guard';
import {AuthComponent} from './auth/auth.component';
import {authRoutes} from './auth/auth.routes';
import {GameChoiceComponent} from './layouts/game-choice/game-choice.component';
import {NewGameComponent} from './layouts/new-game/new-game.component';
import {AutomaticallyGeneratedGameComponent} from './layouts/automatically-generated-game/automatically-generated-game.component';
import { gameSessionRoutes } from './layouts/game-session/game-session.routes';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => authRoutes)
  },
  {
    path: '',
    component: GameChoiceComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'games/list',
        component: GamesListComponent
      },
      {
        path: 'games/sessions',
        children: gameSessionRoutes
      },
      {
        path: 'games/new',
        component: NewGameComponent
      },
      {
        path: 'games/new/manually/:id',
        component: EditableGameBoardComponent
      },
      {
        path: 'games/new/automatically',
        component: AutomaticallyGeneratedGameComponent
      },
      {
        path: 'game/edit/:id',
        component: EditableGameBoardComponent
      },
      {
        path: 'game/session/:id',
        component: GameBoardComponent
      }
    ]
  }
];
