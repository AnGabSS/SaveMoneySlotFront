import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMoneyChartComponent } from './saved-money-chart.component';

describe('SavedMoneyChartComponent', () => {
  let component: SavedMoneyChartComponent;
  let fixture: ComponentFixture<SavedMoneyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedMoneyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedMoneyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
