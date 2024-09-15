import {Routes} from "@angular/router";
import {MenuComponent} from "./menu/menu.component";
import {GameComponent} from "./game/game.component";
import {GameOverComponent} from "./game-over/game-over.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {GamePausedComponent} from "./game-paused/game-paused.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    data: {title: "Adham's Website"}
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {title: "Game Menu"}
  },
  {
    path: 'game',
    component: GameComponent,
    children: [
      {
        path: 'game-over',
        component: GameOverComponent,
        data: {title: "Game Over"}
      },
      {
        path: 'game-paused',
        component: GamePausedComponent,
        data: {title: "Game Paused"}
      }
    ],
    data: {title: `Chicken Game`}
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {title: "Page Not Found"}
  }


];
