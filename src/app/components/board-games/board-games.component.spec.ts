import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesComponent } from './board-games.component';

describe('GameBoardComponent', () => {
  let component: BoardGamesComponent;
  let fixture: ComponentFixture<BoardGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
