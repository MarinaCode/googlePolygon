import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UtilityServiceService {
  public addressChanged: EventEmitter<any> = new EventEmitter<any>();
  public resetSelection: EventEmitter<any> = new EventEmitter<any>();
  public updateButtonTools: EventEmitter<any> = new EventEmitter<any>();
  public confirmSelection: EventEmitter<any> = new EventEmitter<any>();
  public updateList: EventEmitter<any> = new EventEmitter<any>();
  public openPopup: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  notifyAddressChange(addressData: any, edit: any) {
    this.addressChanged.emit({addressData, edit: edit});
  }

  notifyUpdateList(location) {
    this.updateList.emit(location);
  }

  notifyUpdateButtonTools(selected) {
    this.updateButtonTools.emit(selected);
  }

  notifyOpenPopupEdit(currentLocation, id) {
    currentLocation.selectedId = id;
    this.openPopup.emit(currentLocation);
  }

  notifyResetSelection() {
    this.resetSelection.emit();
  }

  notifyConfirmSelection(location: any) {
    this.confirmSelection.emit(location);
  }
}
