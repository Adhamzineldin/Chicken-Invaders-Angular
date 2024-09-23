import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {GameComponent} from "./game/game.component";
import {MenuComponent} from "./menu/menu.component";
import {GameOverComponent} from "./game-over/game-over.component";
import {Title} from "@angular/platform-browser";
import {filter, map} from 'rxjs/operators';
import {IpService} from "./ip.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent, MenuComponent, GameOverComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  static page: string = "menu";
  static mode: string;
  static playAgain = false;
  static gameObject: (GameComponent | any);
  static name: string;
  static ipAddress: any;

  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private ipService: IpService) {
  }

  ngOnInit() {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map(route => route.snapshot.data)
      )
      .subscribe(data => {
        if (data && data['title']) {
          this.titleService.setTitle(data['title']);
        } else {
          this.titleService.setTitle('Default Title');
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

  static getIpAddress() {
    return AppComponent.ipAddress;
  }

  protected readonly GameComponent = GameComponent;


}
