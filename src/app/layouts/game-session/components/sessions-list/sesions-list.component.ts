import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {GameSessionService} from '../../game-session.service';
import {SubHeaderComponent} from '../../../sub-header/sub-header.component';
import {GameSession} from '@core/interfaces/game-session.interfaces';
import {HlmIconDirective} from '@libs/ui-icon-helm/src';
import {NgIcon} from '@ng-icons/core';
import {HlmTooltipComponent, HlmTooltipTriggerDirective} from '@spartan-ng/ui-tooltip-helm';
import {BrnTooltipContentDirective} from '@spartan-ng/brain/tooltip';
import {NotificationService} from '@core/services/notification.service';

@Component({
  selector: 'app-games-list',
  imports: [
    RouterLink,
    SubHeaderComponent,
    HlmIconDirective,
    NgIcon,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    HlmTooltipComponent
  ],
  templateUrl: './sesions-list.component.html',
  styleUrl: './sesions-list.component.scss'
})
export class SessionListComponent implements OnInit {
  private gameSessionService = inject(GameSessionService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  public isSessions = signal(false);

  public sessionList = signal<GameSession[]>([]);

  constructor() {}

  ngOnInit() {
    this.gameSessionService.getAllGameSessions().subscribe(sessions => {
      console.log('LIST', sessions);
      this.sessionList.set(sessions);
    });
  }

  handleStopSession(gameId: string) {
    this.sessionList.update(list => list.filter(session => session.id !== gameId));
    this.gameSessionService.stopSession(gameId).subscribe(data => {
      this.notificationService.showNotification('success', 'Game stopped', 3000);
    });
  }
}
