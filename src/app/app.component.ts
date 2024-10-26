import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {GameComponent} from "./game/game.component";
import {MenuComponent} from "./menu/menu.component";
import {GameOverComponent} from "./game-over/game-over.component";
import {Title} from "@angular/platform-browser";
import {filter, map} from 'rxjs/operators';
import {IpService} from "./ip.service";
import {DOCUMENT} from "@angular/common";


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
  static api = 'http://localhost:3000/api';
  domain: string = '';
  backendPort = '1338';
  frontendPort = '80';


  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private ipService: IpService) {

  }


  ngOnInit() {

    this.domain = window.location.hostname;
    if (this.domain === "localhost") {
      AppComponent.api = `http://localhost:${this.backendPort}/api`;
    } else {
      AppComponent.api = `https://${this.domain}:${this.backendPort}/api`;
    }

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
    return AppComponent.api;
  }

  protected readonly GameComponent = GameComponent;


}
