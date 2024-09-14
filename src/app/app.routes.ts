import {Routes} from "@angular/router";
import {MenuComponent} from "./menu/menu.component";
import {GameComponent} from "./game/game.component";
import {GameOverComponent} from "./game-over/game-over.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'game',
    component: GameComponent,
    children: [
      {
        path: 'game-over',
        component: GameOverComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }


];
