import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableGameBoardComponent } from './editable-game-board.component';

describe('EditableGameBoardComponent', () => {
  let component: EditableGameBoardComponent;
  let fixture: ComponentFixture<EditableGameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableGameBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableGameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
