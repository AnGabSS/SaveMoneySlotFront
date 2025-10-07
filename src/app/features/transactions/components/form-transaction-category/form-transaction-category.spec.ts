import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTransactionCategory } from './form-transaction-category';

describe('FormTransactionCategory', () => {
  let component: FormTransactionCategory;
  let fixture: ComponentFixture<FormTransactionCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTransactionCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTransactionCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
