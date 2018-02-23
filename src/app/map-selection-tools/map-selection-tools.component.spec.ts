import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectionToolsComponent } from './map-selection-tools.component';

describe('MapSelectionToolsComponent', () => {
  let component: MapSelectionToolsComponent;
  let fixture: ComponentFixture<MapSelectionToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectionToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectionToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
