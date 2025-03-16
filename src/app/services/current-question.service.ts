import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class CurrentQuestionService {
  private currentQuestionPoints = new BehaviorSubject<number | null>(null);

  public setCurrentQuestionPoints(points: number | null) {
    this.currentQuestionPoints.next(points);
  }

  public getCurrentQuestionPoints() {
    return this.currentQuestionPoints.asObservable();
  }
}
