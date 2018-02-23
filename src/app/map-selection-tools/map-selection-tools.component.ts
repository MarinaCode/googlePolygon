import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UtilityServiceService} from '../utility-service.service';

declare var google: any;
@Component({
  selector: 'app-map-selection-tools',
  templateUrl: './map-selection-tools.component.html',
  styleUrls: ['./map-selection-tools.component.css']
})
export class MapSelectionToolsComponent implements OnInit {
  locations: any;
  @ViewChild('searchName') searchName: ElementRef;
  @Input() locationData: any;

  constructor(private service: UtilityServiceService) {
  }

  ngOnInit() {
    if (this.locationData) {
      this.searchName.nativeElement.value = this.locationData.location.formatted_address;
      this.setPlaces(this.locationData, true);
    }
    this.service.updateButtonTools.subscribe(data => {
      this.locations = data;
    });
  }

  confirmSelection() {
    this.service.notifyConfirmSelection(this.locations);
  }

  isValid() {
    return this.locations != null;
  }

  resetSelection() {
    this.locations = null;
    this.service.notifyResetSelection();
  }

  setPlaces(location_, edit) {
    this.locations = location_;
    this.service.notifyAddressChange(location_, edit);
  }
}
