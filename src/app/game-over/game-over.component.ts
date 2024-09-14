import { Component } from '@angular/core';
import {AppComponent} from "../app.component";
import {MenuComponent} from "../menu/menu.component";
import {GameComponent} from "../game/game.component";
import {Router} from "@angular/router";

@Component({
  selector: 'game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent {

  constructor(private router: Router) {

  }


static finalScore: number = 0;
static highestScore = {
  "easy": 0,
  "medium": 0,
  "hard": 0
}

static localStorage: Storage = window.localStorage;
 static localStorageKey: string = "chicken-game-scores";



  static getFromLocalStorage() {
    const storedValue = GameOverComponent.localStorage.getItem(GameOverComponent.localStorageKey);

    if (storedValue) {
      GameOverComponent.highestScore = JSON.parse(storedValue);
    }
  }


  getFinalScore() {
    return GameOverComponent.finalScore;
  }

  getHighestScore(difficulty: 'easy' | 'medium' | 'hard') {
    return GameOverComponent.highestScore[difficulty];
  }

  static endGame(score: number, difficulty:'easy' | 'medium' | 'hard') {
    this.getFromLocalStorage();
    GameOverComponent.finalScore = score;
    if ( GameOverComponent.finalScore > GameOverComponent.highestScore[difficulty]) {
      GameOverComponent.highestScore[difficulty] = GameOverComponent.finalScore;
      this.localStorage[this.localStorageKey] = JSON.stringify(GameOverComponent.highestScore);
    }

  }

  playAgain() {
    AppComponent.getGameComponent().restartGame();
    this.router.navigate(['/game']).then(r => console.log("Game Restarted"));

  }

  goBackToMenu() {
    AppComponent.page = "menu";
    this.router.navigate(['menu']).then(r => console.log("Navigated to menu"));
  }

  protected readonly AppComponent = AppComponent;
}
