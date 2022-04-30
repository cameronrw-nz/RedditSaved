import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { formatDate } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListOptionHarness } from '@angular/material/list/testing'

import { SavedDisplayCardComponent } from './saved-display-card.component';
import { MatListModule } from '@angular/material/list';
import { Component, Input } from '@angular/core';
import { IRedditSaved } from '../interfaces/IRedditSaved';

describe('SavedDisplayCardComponent Tests', () => {

  describe('SavedDisplayCardComponent Dom Tests', () => {
    let component: SavedDisplayCardComponent;
    let fixture: ComponentFixture<SavedDisplayCardComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [SavedDisplayCardComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(SavedDisplayCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show nothing when the reddit item is undefined', () => {
      fixture = TestBed.createComponent(SavedDisplayCardComponent);

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.children).toHaveSize(0);
    });

    it('should show name when the reddit item is defined', () => {
      // Arrange
      const mockItem = {
        date: new Date(2015, 0, 1),
        id: "cef67ca",
        link: "https://example.com",
        name: "Improve Your Javascript Testing Via TDD!",
        subreddit: "r/javascript"
      };
      component.item = { ...mockItem }
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const savedItemNameElement = compiled.querySelector("[data-testid='saved-item-name']");

      // Assert
      expect(savedItemNameElement?.textContent).toBe(mockItem.name);
    });

    it('should show subreddit when the reddit item is defined', () => {
      // Arrange
      const mockItem = {
        date: new Date(2015, 0, 1),
        id: "cef67ca",
        link: "https://example.com",
        name: "Improve Your Javascript Testing Via TDD!",
        subreddit: "r/javascript"
      };
      component.item = { ...mockItem }
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const savedItemSubredditElement = compiled.querySelector("[data-testid='saved-item-subreddit']");

      // Assert
      expect(savedItemSubredditElement?.textContent).toBe(mockItem.subreddit);
    });

    it('should show date formatted correctly when the reddit item is defined', () => {
      // Arrange
      const mockItem = {
        date: new Date(2015, 0, 1),
        id: "cef67ca",
        link: "https://example.com",
        name: "Improve Your Javascript Testing Via TDD!",
        subreddit: "r/javascript"
      };
      component.item = { ...mockItem }
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const savedItemDateElement = compiled.querySelector("[data-testid='saved-item-date']");

      // Assert
      expect(savedItemDateElement?.textContent).toBe(formatDate(mockItem.date, "mediumDate", "en-US"));
    });
  });

  describe('SavedDisplayCardComponent Dom Tests With Provider', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MatListModule],
        declarations: [TestHostComponent, SavedDisplayCardComponent]
      })
        .compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not be selected by default', async () => {
      // Arrange
      const mockItem = {
        date: new Date(2015, 0, 1),
        id: "cef67ca",
        link: "https://example.com",
        name: "Improve Your Javascript Testing Via TDD!",
        subreddit: "r/javascript"
      };
      component.item = { ...mockItem };

      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const listOption = await loader.getHarness(MatListOptionHarness);
      expect(await listOption.isSelected()).toBeFalse();
    });

    it('should not be selected when the reddit item is not selected', async () => {
      // Arrange
      const mockItem = {
        date: new Date(2015, 0, 1),
        id: "cef67ca",
        link: "https://example.com",
        name: "Improve Your Javascript Testing Via TDD!",
        subreddit: "r/javascript"
      };
      component.item = { ...mockItem };
      component.isSelected = false;

      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const listOption = await loader.getHarness(MatListOptionHarness);
      expect(await listOption.isSelected()).toBeFalse();
    });

    it('should be selected when the reddit item is selected', async () => {
      // Arrange
      const mockItem = {
        date: new Date(2015, 0, 1),
        id: "cef67ca",
        link: "https://example.com",
        name: "Improve Your Javascript Testing Via TDD!",
        subreddit: "r/javascript"
      };
      component.item = { ...mockItem };
      component.isSelected = true;

      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const listOption = await loader.getHarness(MatListOptionHarness);
      expect(await listOption.isSelected()).toBeTrue();
    });

    @Component({
      selector: `host-component`,
      template: `
      <mat-selection-list>
        <app-saved-display-card [item]="item" [isSelected]="isSelected">
        </app-saved-display-card>
      </mat-selection-list>
     `,
    })
    class TestHostComponent {
      @Input() item: IRedditSaved | undefined = undefined;
      @Input() isSelected: boolean = false;
      constructor() { }

      ngOnInit(): void {
      }
    }
  });
});