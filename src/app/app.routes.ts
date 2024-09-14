import {Routes} from "@angular/router";
import {MenuComponent} from "./menu/menu.component";
import {GameComponent} from "./game/game.component";
import {GameOverComponent} from "./game-over/game-over.component";
import {NotFoundComponent} from "./not-found/not-found.component";

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
      }
    ],
    data: {title: "Chicken Game"}
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {title: "Page Not Found"}
  }


];
