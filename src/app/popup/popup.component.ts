import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UtilityServiceService} from '../utility-service.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  activePopup: NgbActiveModal;
  locationData: any;
  @ViewChild('content') content: ElementRef;
  constructor(private modalService: NgbModal, private service: UtilityServiceService) {
  }

  updateGrid(locations) {
    this.service.notifyUpdateList(locations);
    this.activePopup.close();
  }
  ngOnInit() {
    this.service.openPopup.subscribe((location) => {
      this.locationData = location;
      this.activePopup = this.modalService.open(this.content);
    });
  }
  openPopup(content) {
    this.locationData = null;
    this.activePopup = this.modalService.open(content);
  }
  closePopup() {
    this.activePopup.close();
  }
}
