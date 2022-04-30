import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDrawerHarness } from '@angular/material/sidenav/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SavedDisplayComponent } from './saved-display.component';

describe('SavedDisplayComponent', () => {
  describe("Filter Display Tests", () => {
    let component: SavedDisplayComponent;
    let fixture: ComponentFixture<SavedDisplayComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MatSidenavModule, BrowserAnimationsModule],
        declarations: [SavedDisplayComponent],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents();

      fixture = TestBed.createComponent(SavedDisplayComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("show the drawer when the saved display is showing filter", async () => {
      // Arrange
      component.isShowingFilter = true;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const drawer = await loader.getHarness(MatDrawerHarness);
      expect(await drawer.isOpen()).toBeTrue();
    });

    it("does not show the drawer when the saved display is not showing filter", async () => {
      // Arrange
      component.isShowingFilter = false;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const drawer = await loader.getHarness(MatDrawerHarness);
      expect(await drawer.isOpen()).toBeFalse();
    });

    it("shows the drawer as side when the screen is a large size", async () => {
      // Arrange
      const tempWindowSize = window.innerWidth;
      window.innerWidth = 1900;

      fixture = TestBed.createComponent(SavedDisplayComponent);
      component = fixture.componentInstance;
      component.isShowingFilter = true;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const drawer = await loader.getHarness(MatDrawerHarness);
      expect(await drawer.getMode()).toBe("side");

      window.innerWidth = tempWindowSize;
    });

    it("shows the drawer as over when the screen is a small size", async () => {
      // Arrange
      const tempWindowSize = window.innerWidth;
      window.innerWidth = 400;

      fixture = TestBed.createComponent(SavedDisplayComponent);
      component = fixture.componentInstance;
      component.isShowingFilter = true;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const drawer = await loader.getHarness(MatDrawerHarness);
      expect(await drawer.getMode()).toBe("over");

      window.innerWidth = tempWindowSize;
    });
  });
});
