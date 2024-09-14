import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GameComponent} from "./game/game.component";
import {MenuComponent} from "./menu/menu.component";
import {GameOverComponent} from "./game-over/game-over.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent, MenuComponent, GameOverComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   static page: string = "menu";
   static mode: string;
   static playAgain = false;
   static gameObject: (GameComponent | any) ;



   static getMode() {
    return AppComponent.mode as 'easy' | 'medium' | 'hard';
   }

   getPage() {
    return AppComponent.page;
   }

   static getGameComponent() {
     console.log(AppComponent.gameObject);
     return AppComponent.gameObject;
   }

  protected readonly GameComponent = GameComponent;
}
