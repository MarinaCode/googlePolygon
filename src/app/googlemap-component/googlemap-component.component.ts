import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilityServiceService} from '../utility-service.service';
declare var google: any;
@Component({
  selector: 'app-googlemap-component',
  templateUrl: './googlemap-component.component.html',
  styleUrls: ['./googlemap-component.component.css']
})
export class GooglemapComponentComponent implements OnInit {
  @Output() updateGridData: EventEmitter<any> = new EventEmitter();
  @Output() updateToolsButton: EventEmitter<any> = new EventEmitter();
  map: any;
  selectedPoligon: any;
  selectedLocation: any = {};
  drawingManager: any;
  infoWindow: any;
  poligonOptions: any = {
    draggable: false,
    editable: false,
    fillColor: '#ff9502',
    strokeColor: '#ff9502',
    strokeWidth: 2
  };
  constructor(private service: UtilityServiceService) {
  }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('googleMapComponent'), {
      center: { lat: 17.4471, lng: 78.454 },
      zoom: 10,
      mapTypeId: 'satellite'
    });

    this.infoWindow = new google.maps.InfoWindow();

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: this.poligonOptions,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      }
    });
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (poligon) => {
      this.selectedPoligon = poligon;
      this.drawingManager.setDrawingMode(null);
      this.service.notifyUpdateButtonTools(this.selectedPoligon);
      this.openInfoArea(poligon.overlay);
    });

    this.service.addressChanged.subscribe((data) => {
      const location = data.edit ? data.addressData.location : data.addressData;
      this.selectedLocation.location = location;
      this.map.setCenter(location && location.geometry ? location.geometry.location : null);
      this.map.setZoom(17);
      this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
      this.drawingManager.setMap(this.map);
      if (!data.edit) {
        this.clearSelection();
      } else {
        const polygon = new google.maps.Polygon({
          fillColor: '#ff9502',
          strokeColor: '#ff9502',
          strokeWidth: 2,
          path:  data.addressData.paths
        });
        this.selectedPoligon = polygon;
        polygon.setMap(this.map);
        this.drawingManager.setDrawingMode(null);
        this.openInfoArea(this.selectedPoligon);
      }
    });
    this.service.resetSelection.subscribe(() => {
      this.clearSelection();
    });
    this.service.confirmSelection.subscribe(() => {
      this.updateGridData.emit(this.selectedLocation);
    });
  }

  openInfoArea(poligon) {
    const path = poligon.getPath();
    this.selectedLocation.area = google.maps.geometry.spherical.computeArea(path).toFixed(2);
    const content = 'Area: ' + this.selectedLocation.area + ' m<sup>2</sup>';
    this.infoWindow.setContent(content);
    const bounds = new google.maps.LatLngBounds();
    path.forEach((points) => {
      bounds.extend(points);
    });
    this.selectedLocation.path = path;
    this.infoWindow.setPosition(bounds.getCenter());
    this.infoWindow.open(this.map);
  }

  clearSelection() {
    if (this.selectedPoligon) {
      this.selectedPoligon.overlay ? this.selectedPoligon.overlay.setMap(null) : this.selectedPoligon.setMap(null);
    }
    this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    this.infoWindow.close();
  }
}
