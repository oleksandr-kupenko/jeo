import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {debounceTime, Subject} from 'rxjs';
import {CurrentQuestionService} from '../../../../services/current-question.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-teams',
  imports: [FormsModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit {
  public teams = signal<[]>([]);

  private updateTeamTrigger = new Subject<void>();

  private currentQuestionService = inject(CurrentQuestionService);
  public currentPoints = toSignal(this.currentQuestionService.getCurrentQuestionPoints());

  constructor() {}

  ngOnInit(): void {

  }

  public handleUpdateTeams() {
    this.updateTeamTrigger.next();
  }

  public handleIncreasePoints(id: string) {
    // const newTeams = this.teams().map(team => {
    //   if (team.id === id) {
    //     return {
    //       ...team,
    //       points: team.points + (this.currentPoints() || 0)
    //     };
    //   }
    //   return team;
    // });
    // console.log(newTeams);
    //
    // this.gameBoardService.updateTeams([]);
  }

  public handleDecreasePoints(id: string) {
    // const newTeams = this.teams().map(team => {
    //   if (team.id === id) {
    //     return {
    //       ...team,
    //       points: team.points - (this.currentPoints() || 0)
    //     };
    //   }
    //   return team;
    // });
    // console.log(newTeams);
    // this.gameBoardService.updateTeams([]);
  }
}
