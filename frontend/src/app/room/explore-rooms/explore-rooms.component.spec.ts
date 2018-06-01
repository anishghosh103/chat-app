import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreRoomsComponent } from './explore-rooms.component';

describe('ExploreRoomsComponent', () => {
  let component: ExploreRoomsComponent;
  let fixture: ComponentFixture<ExploreRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
