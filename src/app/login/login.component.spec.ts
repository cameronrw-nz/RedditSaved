import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RedditService } from '../reddit.service';

import { LoginComponent } from './login.component';

describe('LoginComponent Tests', () => {
  describe("Basic Tests", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('LoginComponent Dom Tests', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let redditService: RedditService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          LoginComponent,
        ],
        providers: [RedditService]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      redditService = TestBed.inject(RedditService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("does not show the loading spinner when the screen has first loaded", () => {
      // Assert
      const compiled = fixture.nativeElement as HTMLElement;
      const progress = compiled.querySelector("[data-testid='login-spinner-progress']");
      expect(progress).withContext("progress").toBeNull();
    });

    it("does show the loading spinner when the login is processing", () => {
      // Arrange
      spyOn(redditService, 'logon').and.returnValue(new Promise(resolve => resolve(true)));
      component.username = "darzolak";
      component.password = "test123";
      fixture.detectChanges();

      // Act
      let compiled = fixture.nativeElement as HTMLElement;
      const loginButton = compiled.querySelector("[data-testid='login-button']");
      (loginButton as HTMLButtonElement).click();

      fixture.detectChanges();

      // Assert
      compiled = fixture.nativeElement as HTMLElement;
      const progress = compiled.querySelector("[data-testid='login-spinner-progress']");
      expect(progress).withContext("progress").not.toBeNull();
    });
  });
});
