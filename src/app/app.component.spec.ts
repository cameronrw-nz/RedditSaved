import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Snoowrap from 'snoowrap';
import { RedditUser } from 'snoowrap';
import { AppComponent } from './app.component';
import { RedditService } from './reddit.service';

@Component({
  selector: 'app-login',
  template: '<p>Mock Login Component</p>'
})
class MockLoginComponent { }

@Component({
  selector: 'app-saved-display',
  template: '<p>Mock Saved Display Component</p>'
})
class MockSavedDisplayComponent { }

describe('AppComponent', () => {
  describe("Basic tests", () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          MockLoginComponent,
          MockSavedDisplayComponent
        ],
      }).compileComponents();
    });

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.shell')?.textContent).toContain('Reddit Saved');
    });
  })

  describe('AppComponent Dom Tests With Provider', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let redditService: RedditService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          MockLoginComponent,
          MockSavedDisplayComponent
        ],
        providers: [RedditService]
      }).compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      redditService = TestBed.inject(RedditService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not show the filter icon on screen load', async () => {
      // Assert
      const compiled = fixture.nativeElement as HTMLElement;
      const filterIcon = compiled.querySelector("[data-testid='filter-icon-button']");
      expect(filterIcon).withContext("filterIcon").toBeNull();
    });

    it('should show the filter icon after user logs in', async () => {
      // Arrange
      redditService.me = getMockRedditUser("Darzolak");

      // Act
      component.onLoggedIn();
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement as HTMLElement;
      const filterIcon = compiled.querySelector("[data-testid='filter-icon-button']");
      expect(filterIcon).withContext("filterIcon").not.toBeNull();
    });

    it('should toggle isShowingFilter when the filter button is clicked', async () => {
      // Arrange
      component.loggedInUserName = "Darzolak"
      fixture.detectChanges();

      // Act
      expect(component.isShowingFilter).withContext("isShowingFilter before click").toBeTrue();

      const compiled = fixture.nativeElement as HTMLElement;
      const filterIcon = compiled.querySelector("[data-testid='filter-icon-button']");

      (filterIcon as HTMLButtonElement).click();

      // Assert
      expect(component.isShowingFilter).withContext("isShowingFilter after click").toBeFalse();
    });
  });
});

function getMockRedditUser(name: string) {
  return { name } as RedditUser;
}
