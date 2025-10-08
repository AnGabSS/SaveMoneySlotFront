import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTransaction} from './form-transaction';

describe('CreateTransaction', () => {
  let component: FormTransaction;
  let fixture: ComponentFixture<FormTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTransaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
