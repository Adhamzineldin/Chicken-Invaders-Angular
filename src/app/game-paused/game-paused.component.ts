import {Component} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-paused',
  standalone: true,
  imports: [],
  templateUrl: './game-paused.component.html',
  styleUrl: './game-paused.component.css'
})
export class GamePausedComponent {
  constructor(private router: Router) {

  }

  resumeGame() {
    AppComponent.page = "game";
    AppComponent.getGameComponent().resumeGame();

  }

  goBackToMenu() {
    AppComponent.page = "menu";
    this.router.navigate(['menu']).then(r => console.log("Navigated to menu"));
  }
}
