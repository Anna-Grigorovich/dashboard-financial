import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUserComponent } from './top-user.component';

describe('TopUserComponent', () => {
  let component: TopUserComponent;
  let fixture: ComponentFixture<TopUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopUserComponent]
    });
    fixture = TestBed.createComponent(TopUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
