import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPicsComponent } from './shared-pics.component';

describe('SharedPicsComponent', () => {
  let component: SharedPicsComponent;
  let fixture: ComponentFixture<SharedPicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedPicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
