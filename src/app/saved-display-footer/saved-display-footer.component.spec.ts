import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorHarness } from '@angular/material/paginator/testing'
import { MatToolbarModule } from '@angular/material/toolbar';
import { first } from 'rxjs';

import { IRedditSaved } from '../interfaces/IRedditSaved';
import { RedditService } from '../reddit.service';
import { SavedDisplayFooterComponent } from './saved-display-footer.component';

describe('SavedDisplayFooterComponent', () => {
  let component: SavedDisplayFooterComponent;
  let fixture: ComponentFixture<SavedDisplayFooterComponent>;
  let loader: HarnessLoader;
  let redditService: RedditService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedDisplayFooterComponent],
      imports: [MatToolbarModule, MatPaginatorModule],
      providers: [RedditService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDisplayFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const matToolbarElement = compiled.querySelector("mat-toolbar");

    expect(component).withContext("Component Class").toBeTruthy();
    expect(matToolbarElement).withContext("matToolbarElement").toBeDefined();
  });

  describe('Paginator Tests', () => {
    it('should show the paginator when there are selected items and screen size is large', async () => {
      const tempWindowSize = window.innerWidth;
      window.innerWidth = 1900;

      component.selectedIds = ["item1", "item2"];
      component.allSavedRedditItemsSize = 20;
      redditService = TestBed.inject(RedditService);
      redditService.items.next(getMockVisibleItems(20));
      redditService.filteredItems.next(getMockVisibleItems(20));
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const paginator = await loader.getHarness(MatPaginatorHarness);
      expect(await paginator.getPageSize()).withContext("Page Size").toBe(50);
      expect(await paginator.getRangeLabel()).withContext("Range Label Beginning").toContain("1");
      expect(await paginator.getRangeLabel()).withContext("Range Label End").toContain("20");

      window.innerWidth = tempWindowSize;

    });

    it('should show the paginator when the screen size is large and no selected items', async () => {
      const tempWindowSize = window.innerWidth;
      window.innerWidth = 1900;

      fixture = TestBed.createComponent(SavedDisplayFooterComponent);
      redditService = TestBed.inject(RedditService);
      redditService.items.next(getMockVisibleItems(20));
      redditService.filteredItems.next(getMockVisibleItems(20));
      component = fixture.componentInstance;
      component.selectedIds = [];
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const paginator = await loader.getHarness(MatPaginatorHarness);
      expect(await paginator.getPageSize()).withContext("Page Size").toBe(50);
      expect(await paginator.getRangeLabel()).withContext("Range Label Beginning").toContain("1");
      expect(await paginator.getRangeLabel()).withContext("Range Label End").toContain("20");

      window.innerWidth = tempWindowSize;
    });

    it('should show the paginator when the screen size is small and no selected items', async () => {
      const tempWindowSize = window.innerWidth;
      window.innerWidth = 400;

      fixture = TestBed.createComponent(SavedDisplayFooterComponent);
      redditService = TestBed.inject(RedditService);
      redditService.items.next(getMockVisibleItems(20));
      redditService.filteredItems.next(getMockVisibleItems(20));
      component = fixture.componentInstance;
      component.selectedIds = [];
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const paginator = await loader.getHarness(MatPaginatorHarness);
      expect(await paginator.getPageSize()).withContext("Page Size").toBe(50);
      expect(await paginator.getRangeLabel()).withContext("Range Label Beginning").toContain("1");
      expect(await paginator.getRangeLabel()).withContext("Range Label End").toContain("20");

      window.innerWidth = tempWindowSize;
    });

    it('should not show the paginator when the screen size is small and selected items', async () => {
      const tempWindowSize = window.innerWidth;
      window.innerWidth = 400;

      fixture = TestBed.createComponent(SavedDisplayFooterComponent);
      component = fixture.componentInstance;
      component.selectedIds = ["item1", "item2"];
      component.allSavedRedditItemsSize = 20
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const paginators = await loader.getAllHarnesses(MatPaginatorHarness);
      expect(paginators).toHaveSize(0);

      window.innerWidth = tempWindowSize;
    });

    it('should show the paginator with selected items count when the screen size is large and selected items', async () => {
      const tempWindowSize = window.innerWidth;
      window.innerWidth = 1900;

      fixture = TestBed.createComponent(SavedDisplayFooterComponent);
      redditService = TestBed.inject(RedditService);
      redditService.items.next(getMockVisibleItems(20));
      redditService.filteredItems.next(getMockVisibleItems(10));
      component.selectedIds = ["item1", "item2"];
      component.allSavedRedditItemsSize = 20
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      // Assert
      const paginator = await loader.getHarness(MatPaginatorHarness);
      expect(await paginator.getPageSize()).withContext("Page Size").toBe(50);
      expect(await paginator.getRangeLabel()).withContext("Range Label Start").toContain("1");
      expect(await paginator.getRangeLabel()).withContext("Range Label End").toContain("10");

      window.innerWidth = tempWindowSize;
    });
  });

  describe("Selected Items Tests", () => {
    it('should not show the selected items info when there are no selected items', async () => {
      // Arrange
      component.selectedIds = [];
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement as HTMLElement;

      const selectedItemsInfo = compiled.querySelector("[data-testid='selected-items-info']");
      const clearSelection = compiled.querySelector("[data-testid='clear-selection']");
      const removeSelectedItems = compiled.querySelector(".remove-selected-items");

      expect(selectedItemsInfo).withContext("selectedItemsInfo").toBeNull();
      expect(clearSelection).withContext("clearSelection").toBeNull();
      expect(removeSelectedItems).withContext("removeSelectedItems").toBeNull();
    });

    it('should show the selected items info when there are selected items', async () => {
      // Arrange
      component.visibleSavedRedditItems = getMockVisibleItems(10);
      component.selectedIds = ["item1", "item2"];
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement as HTMLElement;

      const selectedItemsInfo = compiled.querySelector("[data-testid='selected-items-info']");
      const clearSelection = compiled.querySelector("[data-testid='clear-selection']");
      const removeSelectedItems = compiled.querySelector(".remove-selected-items");

      expect(selectedItemsInfo).withContext("selectedItemsInfo").not.toBeNull();
      expect(selectedItemsInfo?.textContent).withContext("selectedItemsInfo").toContain("2/10");

      expect(clearSelection).withContext("clearSelection").not.toBeNull();
      expect(removeSelectedItems).withContext("removeSelectedItems").not.toBeNull();
    });

    it('should clear the selected items when the clear button is clicked', async () => {
      // Arrange
      component.visibleSavedRedditItems = getMockVisibleItems(10);
      component.selectedIds = ["item1", "item2"];
      component.clearSelection = new EventEmitter(false);
      component.clearSelection.pipe(first()).subscribe(() => component.selectedIds = []);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      let selectedItemsInfo = compiled.querySelector("[data-testid='selected-items-info']");
      let clearSelection = compiled.querySelector("[data-testid='clear-selection']") as HTMLButtonElement | null;

      expect(selectedItemsInfo).withContext("selectedItemsInfo").not.toBeNull();
      expect(selectedItemsInfo?.textContent).withContext("selectedItemsInfo").toContain("2/10");

      expect(clearSelection).withContext("clearSelection").not.toBeNull();
      expect(clearSelection?.click).withContext("clearSelection is missing click").toBeDefined();

      // Act
      clearSelection?.click();
      fixture.detectChanges();

      // Assert
      selectedItemsInfo = compiled.querySelector("[data-testid='selected-items-info']");
      clearSelection = compiled.querySelector("[data-testid='clear-selection']");
      const removeSelectedItems = compiled.querySelector(".remove-selected-items");

      expect(selectedItemsInfo).withContext("selectedItemsInfo").toBeNull();
      expect(clearSelection).withContext("clearSelection").toBeNull();
      expect(removeSelectedItems).withContext("removeSelectedItems").toBeNull();
    });

    it('should call unsavePosts when the remove button is clicked', async () => {
      // Arrange
      redditService = TestBed.inject(RedditService);
      spyOn(redditService, 'unsavePosts').and.returnValue(new Promise(resolve => resolve()));
      component.visibleSavedRedditItems = getMockVisibleItems(10);
      component.selectedIds = ["item1", "item2"];
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      let removeSelectedItems = compiled.querySelector(".remove-selected-items") as HTMLButtonElement | null;

      expect(removeSelectedItems).withContext("removeSelectedItems").not.toBeNull();
      expect(removeSelectedItems?.click).withContext("removeSelectedItems is missing click").toBeDefined();

      // Act
      removeSelectedItems?.click();
      fixture.detectChanges();

      // Assert
      expect(redditService.unsavePosts).toHaveBeenCalled();
    });
  })
});

function getMockVisibleItems(size: number): IRedditSaved[] {
  const visibleItems: IRedditSaved[] = []
  for (let index = 0; index < size; index++) {
    visibleItems.push({
      date: new Date(2015, 0, 1),
      id: "cef67ca",
      link: "https://example.com",
      name: "Improve Your Javascript Testing Via TDD!",
      subreddit: "r/javascript"
    });
  }

  return visibleItems;
}
