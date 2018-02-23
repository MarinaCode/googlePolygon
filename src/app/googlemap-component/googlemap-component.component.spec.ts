import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglemapComponentComponent } from './googlemap-component.component';

describe('GooglemapComponentComponent', () => {
  let component: GooglemapComponentComponent;
  let fixture: ComponentFixture<GooglemapComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglemapComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglemapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
