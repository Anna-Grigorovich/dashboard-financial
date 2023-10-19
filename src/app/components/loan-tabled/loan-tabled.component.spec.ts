import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTabledComponent } from './loan-tabled.component';

describe('LoanTabledComponent', () => {
  let component: LoanTabledComponent;
  let fixture: ComponentFixture<LoanTabledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanTabledComponent]
    });
    fixture = TestBed.createComponent(LoanTabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
