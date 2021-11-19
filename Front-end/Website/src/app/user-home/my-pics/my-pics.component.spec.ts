import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPicsComponent } from './my-pics.component';

describe('MyPicsComponent', () => {
  let component: MyPicsComponent;
  let fixture: ComponentFixture<MyPicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
