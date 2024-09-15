import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePausedComponent } from './game-paused.component';

describe('GamePausedComponent', () => {
  let component: GamePausedComponent;
  let fixture: ComponentFixture<GamePausedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePausedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePausedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
