import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from '../utility-service.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locationList: any = [];
  selectedId: any = null;
  constructor(private service: UtilityServiceService) {}

  editLocation(id) {
    this.selectedId = id;
    this.service.notifyOpenPopupEdit(this.locationList[id], id);
  }

  ngOnInit() {
    this.service.updateList.subscribe((location) => {
      const paths = location.path;
      const pathsArray: any = [];
      paths.forEach((path) => {
        pathsArray.push({
          lat: path.lat(),
          lng: path.lng()
        });
      });
      const locationConfig = {
        area: location.area,
        paths: pathsArray,
        location: location.location
      };
      if (this.selectedId == null) {
        this.locationList.push(locationConfig);
      } else {
        this.locationList[this.selectedId] = locationConfig;
      }
      this.selectedId = null;
    });
  }
}
