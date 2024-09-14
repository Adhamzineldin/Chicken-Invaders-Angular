import {Component, HostListener, OnInit, ElementRef} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {AppComponent} from '../app.component';
import {GameOverComponent} from "../game-over/game-over.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";


@Component({
  selector: 'chicken-game',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './game.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./game.component.css'] // Fixed styleUrls (was styleUrl)
})
export class GameComponent implements OnInit {
  score: number = 0;
  rocketStep: number = 0.3;
  canShoot: boolean = true;
  shootCooldown: number = 100;
  eggIntervalId: any[] = [];
  eggInterval: any[] = [];
  offSet: number = 3 * (window.innerWidth / 100);
  keys: any = {};
  main: HTMLElement | null = null;
  scoreBoard: HTMLElement | null = null;
  rocket: HTMLElement | null = null;
  eggSpawnRate: number = 40;
  mode: string = "easy";
  gameLoopVariable: any = null;
  static isGameOver = false;

  constructor(private el: ElementRef, private router: Router, private route: ActivatedRoute) {
  }


  restartGame() {
    this.el.nativeElement.querySelectorAll('.chicken').forEach((chicken: HTMLElement) => {
      chicken.remove();
    });
    this.el.nativeElement.querySelectorAll('.egg').forEach((chicken: HTMLElement) => {
      chicken.remove();
    });
    GameComponent.isGameOver = false;
    AppComponent.playAgain = false;
    console.log("Game restarted " + this.mode);
    this.score = 0;
    this.eggInterval = [];
    this.eggIntervalId = [];
    this.keys = {};
    this.init();

  }


  getMode() {
    return this.mode;
  }


  setDifficultyVariables() {
    if (this.getMode() === 'hard') {
      this.eggSpawnRate = 20;
      this.shootCooldown = 200;
    } else if (this.getMode() === 'medium') {
      this.eggSpawnRate = 30;
      this.shootCooldown = 100;
    } else if (this.getMode() === 'easy') {
      this.eggSpawnRate = 40;
      this.shootCooldown = 10;
    }
  }


  ngOnInit(): void {
    AppComponent.playAgain = false;
    this.main = this.el.nativeElement.querySelector('#main-game');
    this.scoreBoard = this.el.nativeElement.querySelector('#score');
    this.rocket = this.el.nativeElement.querySelector('#rocket');
    this.mode = AppComponent.getMode();
    GameComponent.isGameOver = false;
    this.setDifficultyVariables()
    AppComponent.gameObject = this;
    this.init();
  }

  init() {
    this.updateScore();
    this.setDifficultyVariables();
    GameComponent.isGameOver = false;
    AppComponent.playAgain = false;

    if (this.rocket) {

      this.rocket.style.left = '45vw';
      this.rocket.style.top = '90vh';
      this.rocket.style.width = '6vw';
      this.rocket.style.height = '10vh';
    }
    this.refreshChickens();
    if (this.gameLoopVariable == null) {
      this.gameLoopVariable = requestAnimationFrame(() => this.gameLoop());
    }

  }

  updateScore() {
    if (this.scoreBoard) {
      this.scoreBoard.innerHTML = `Score: ${this.score}`;
    }
  }

  refreshChickens() {

    if (this.eggSpawnRate > 15) {
      this.eggSpawnRate -= 2;
    }
    let positionX;
    let positionY = 0;
    for (let i = 0; i < 4; i++) {
      positionX = 0;
      positionY += 10;
      for (let j = 0; j < 15; j++) {
        positionX += 6;
        const div = document.createElement('div');
        div.classList.add('chicken');
        div.style.left = `${positionX}vw`;
        div.style.top = `${positionY}vh`;
        this.main?.appendChild(div);
      }
    }
    this.spawnEggs();
  }

  spawnEggs() {
    const eggIntervalIdTemp = setInterval(() => {
      const chickens = this.el.nativeElement.querySelectorAll('.chicken');
      chickens.forEach((chicken: HTMLElement) => {
        if (Math.floor(Math.random() * this.eggSpawnRate) === 1 && !GameComponent.isGameOver) {
          const egg = document.createElement('div');
          egg.classList.add('egg');

          chicken.style.width = '6vw';
          chicken.style.height = '10vh';

          const chickenLeft = parseFloat(chicken.style.left) || 0;
          const chickenTop = parseFloat(chicken.style.top) || 0;

          const chickenCenterX = chickenLeft + (parseFloat(chicken.style.width) / 2);
          const chickenCenterY = chickenTop + (parseFloat(chicken.style.height) / 2);


          egg.style.position = 'absolute';
          egg.style.left = `${chickenCenterX}vw`;
          egg.style.top = `${chickenCenterY}vh`;
          egg.style.transform = 'translate(-50%, -50%)';

          this.main?.appendChild(egg);
          this.moveEgg(egg);
        }
      });
    }, 1000);
    this.eggIntervalId.push(eggIntervalIdTemp);
  }


  moveEgg(egg: HTMLElement) {
    let eggStep = 0.5;
    const eggIntervalTemp = setInterval(() => {
      const eggTop = parseFloat(egg.style.top) || 0;
      egg.style.top = `${eggTop + eggStep}vh`;

      if (parseInt(egg.style.top) >= window.innerHeight) {
        clearInterval(eggIntervalTemp);
        egg.remove();
      }

      const eggRect = egg.getBoundingClientRect();
      const rocketRect = this.rocket?.getBoundingClientRect();

      if (rocketRect && this.isCollisionWithOffset(eggRect, rocketRect, this.offSet - 15)) {
        clearInterval(eggIntervalTemp);
        this.gameOver();
        egg.remove();
      }
    }, 30);
    this.eggInterval.push(eggIntervalTemp);
  }

  isCollisionWithOffset(rect1: DOMRect, rect2: DOMRect, offset: number): boolean {
    return !(rect1.right - offset < rect2.left ||
      rect1.left + offset > rect2.right ||
      rect1.bottom - offset < rect2.top ||
      rect1.top + offset > rect2.bottom);
  }

  shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');

    if (this.rocket) {
      const rocketLeft = parseFloat(this.rocket.style.left) || 0;
      const rocketTop = parseFloat(this.rocket.style.top) || 0;

      const rocketCenterX = rocketLeft + (parseFloat(this.rocket.style.width) / 2);
      const rocketCenterY = rocketTop + (parseFloat(this.rocket.style.height) / 2);


      bullet.style.position = 'absolute';
      bullet.style.left = `${rocketCenterX}vw`;
      bullet.style.top = `${rocketCenterY}vh`;
      bullet.style.transform = 'translate(-50%, -50%)';

      this.main?.appendChild(bullet);
      this.moveBullet(bullet);
    }
  }


  moveBullet(bullet: HTMLElement) {
    let bulletStep = 0.5;
    const bulletInterval = setInterval(() => {
      const bulletTop = parseFloat(bullet.style.top) || 0;
      bullet.style.top = `${bulletTop - bulletStep}vh`;

      const chickens = this.el.nativeElement.querySelectorAll('.chicken');
      chickens.forEach((chicken: HTMLElement) => {
        if (this.isCollision(bullet, chicken)) {
          clearInterval(bulletInterval);
          this.score++;
          this.updateScore();
          bullet.remove();
          chicken.remove();
        }
      });

      if (parseInt(bullet.style.top) <= 0) {
        clearInterval(bulletInterval);
        bullet.remove();
      }

      if (chickens.length === 0) {
        this.refreshChickens();
      }
    }, 15);
  }

  isCollision(element1: HTMLElement, element2: HTMLElement): boolean {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom);
  }

  gameOver() {
    GameComponent.isGameOver = true;
    cancelAnimationFrame(this.gameLoopVariable);
    this.keys = {};
    this.eggIntervalId.forEach((interval: any) => {
      clearInterval(interval);
    });
    this.eggInterval.forEach((interval: any) => {
      clearInterval(interval);
    });
    GameComponent.isGameOver = true;
    GameOverComponent.endGame(this.score, this.mode as 'easy' | 'medium' | 'hard');
    this.router.navigate(['game-over'], {relativeTo: this.route}).then(r => console.log(r));


  }

  static getIsGameOver() {
    return GameComponent.isGameOver;
  }

  handleMovement() {
    const gameArea = this.main?.getBoundingClientRect();
    const rocketRect = this.rocket?.getBoundingClientRect();


    if (!gameArea || !rocketRect) return;

    if ((this.keys['ArrowRight'] || this.keys['d']) && (rocketRect.right) < gameArea.right) {
      this.rocket!.style.left = (parseFloat(this.rocket!.style.left) || 0) + this.rocketStep + 'vw';

    }

    if ((this.keys['ArrowLeft'] || this.keys['a']) && (rocketRect.left) > gameArea.left) {
      this.rocket!.style.left = (parseFloat(this.rocket!.style.left) || 0) - this.rocketStep + 'vw';

    }

    if ((this.keys['ArrowUp'] || this.keys['w']) && (rocketRect.top) > gameArea.top) {
      this.rocket!.style.top = (parseFloat(this.rocket!.style.top) || 0) - this.rocketStep + 'vh';

    }

    if ((this.keys['ArrowDown'] || this.keys['s']) && (rocketRect.bottom) < gameArea.bottom) {
      this.rocket!.style.top = (parseFloat(this.rocket!.style.top) || 0) + this.rocketStep + 'vh';
    }

    const chickens = this.el.nativeElement.querySelectorAll('.chicken');
    chickens.forEach((chicken: HTMLElement) => {
      const chickenRect = chicken.getBoundingClientRect();
      if (this.isCollisionWithOffset(rocketRect, chickenRect, this.offSet)) {
        this.gameOver();
      }
    });

    if (this.keys[' '] && this.canShoot) {
      this.shootBullet();
      this.canShoot = false;
      setTimeout(() => this.canShoot = true, this.shootCooldown);
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (!GameComponent.isGameOver) {
      this.keys[event.key] = true;
    }

  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }


  gameLoop() {
    this.handleMovement();

    requestAnimationFrame(() => this.gameLoop());
  }
}
