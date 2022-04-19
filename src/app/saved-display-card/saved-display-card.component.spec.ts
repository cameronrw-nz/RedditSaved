import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDisplayCardComponent } from './saved-display-card.component';

describe('SavedDisplayCardComponent', () => {
  let component: SavedDisplayCardComponent;
  let fixture: ComponentFixture<SavedDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedDisplayCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
