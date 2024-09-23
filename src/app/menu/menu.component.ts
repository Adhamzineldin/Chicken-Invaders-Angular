import {Component} from '@angular/core';
import {AppComponent} from "../app.component";
import {GameComponent} from "../game/game.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  constructor(private router: Router) {
  }

  changePageValueToGame() {
    AppComponent.page = "startGame";
  }

  startGame(difficulty: string) {
    AppComponent.mode = difficulty;
    const nameElement = document?.getElementById("name-input") as HTMLInputElement;
    if (nameElement) {
      AppComponent.name = nameElement.value;
    }
    this.changePageValueToGame();
    console.log("Game started On " + difficulty);
    this.router.navigate(['/game']);

  }

  topScores() {
    this.router.navigate(['top-scores']).then(r => console.log("Navigated to top scores"));
  }


  protected readonly name = name;
  protected readonly AppComponent = AppComponent;
}
