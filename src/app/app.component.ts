import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet, NavigationEnd} from '@angular/router';
import {GameComponent} from "./game/game.component";
import {MenuComponent} from "./menu/menu.component";
import {GameOverComponent} from "./game-over/game-over.component";
import {Title} from "@angular/platform-browser";
import {filter, map} from 'rxjs/operators';

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
  static gameObject: (GameComponent | any);

  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),  // Only trigger on route changes
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;  // Keep going deeper to the active child
          }
          return route;
        }),
        map(route => route.snapshot.data)
      )
      .subscribe(data => {
        if (data && data['title']) {
          this.titleService.setTitle(data['title']);  // Set the title from the child route
        } else {
          this.titleService.setTitle('Default Title');  // Default title if none is found
        }
      });

  }

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
