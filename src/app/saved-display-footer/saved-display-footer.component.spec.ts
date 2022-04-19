import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDisplayFooterComponent } from './saved-display-footer.component';

describe('SavedDisplayFooterComponent', () => {
  let component: SavedDisplayFooterComponent;
  let fixture: ComponentFixture<SavedDisplayFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedDisplayFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDisplayFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
