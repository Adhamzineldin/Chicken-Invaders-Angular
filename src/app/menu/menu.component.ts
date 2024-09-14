import { Component } from '@angular/core';
import { AppComponent} from "../app.component";
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

  static changePageValueToGame(){
    AppComponent.page = "startGame";
  }

  static startGame(difficulty: string) {
    AppComponent.mode = difficulty;
    this.changePageValueToGame();
    console.log("Game started On " + difficulty);

  }

   changePageValueToGame(){
    AppComponent.page = "startGame";
  }

   startGame(difficulty: string) {
    AppComponent.mode = difficulty;
    this.changePageValueToGame();
    console.log("Game started On " + difficulty);
    this.router.navigate(['/game']);

  }





}
