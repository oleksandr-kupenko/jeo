import { Injectable, signal } from "@angular/core";
import { THEME_TYPE } from "@core/interfaces/view-settings.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = signal<THEME_TYPE>(THEME_TYPE.light);

  getTheme() {
    return this.themeSubject();
  }
  
  
}
