import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pageable } from './pageable';

describe('Pageable', () => {
  let component: Pageable;
  let fixture: ComponentFixture<Pageable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pageable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pageable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
