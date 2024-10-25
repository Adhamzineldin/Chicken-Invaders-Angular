import {Component, OnInit, Renderer2} from '@angular/core';
import {NgForOf} from "@angular/common";
import {IpService} from '../ip.service';
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";

interface Score {
  name: string;
  score: number;
  difficulty: string;
}

@Component({
  selector: 'app-top-scores',
  standalone: true,
  templateUrl: './top-scores.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./top-scores.component.css']
})
export class TopScoresComponent implements OnInit {
  scores: Score[] = [];
  private apiUrl = 'YOUR_API_ENDPOINT';
  difficulty: string = AppComponent.mode;
  private ipAddress: any;

  constructor(private renderer: Renderer2, private ipService: IpService, private router: Router) {
  }

  ngOnInit(): void {
    this.ipAddress = this.ipService.getIpAddress();
    AppComponent.ipAddress = this.ipAddress;
    if (!this.difficulty) {
      this.difficulty = 'medium';
    }
    this.loadScores(this.difficulty).then(() => console.log('Scores loaded'));
  }

  async loadScores(difficulty: string): Promise<void> {
    console.log(this.ipAddress);
    try {
      const response = await fetch(`${this.ipAddress}/scores/${difficulty}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.scores = await response.json();
      this.updateScoresList();
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  }

  updateScoresList(): void {
    const scoresList = document.getElementById('scores-list');
    if (scoresList) {
      // Clear existing items
      this.renderer.setProperty(scoresList, 'innerHTML', '');

      this.scores.forEach(score => {
        const li = this.renderer.createElement('li');
        const text = this.renderer.createText(`${score.name}: ${score.score}`);
        this.renderer.appendChild(li, text);
        this.renderer.appendChild(scoresList, li);
      });
    }
  }

  goBackToMenu(): void {
    this.router.navigate(['/']).then(r => console.log("Navigated to top scores"));
  }

  onDifficultyChange(difficulty: string): void {
    this.difficulty = difficulty;
    this.loadScores(difficulty).then(() => console.log('Scores loaded'));
  }
}
