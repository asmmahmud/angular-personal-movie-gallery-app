import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmPageComponent } from './film-page.component';

describe('FilmPageComponent', () => {
  let component: FilmPageComponent;
  let fixture: ComponentFixture<FilmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
