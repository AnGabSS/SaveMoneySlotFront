import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsPerCategoryChartsComponent } from './transactions-per-category-charts.component';

describe('TransactionsPerCategoryChartsComponent', () => {
  let component: TransactionsPerCategoryChartsComponent;
  let fixture: ComponentFixture<TransactionsPerCategoryChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsPerCategoryChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsPerCategoryChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
