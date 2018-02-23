import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
declare var google: any;
@Directive({
  selector: '[appGoogleAutocomplete]'
})
export class GoogleAutocompleteDirective {
  @Output() setPlace: EventEmitter<any> = new EventEmitter();
  autoComplete: any;
  constructor(el: ElementRef) {
    this.autoComplete = new google.maps.places.Autocomplete(el.nativeElement, {
      types: ['geocode']
    });
    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete.getPlace();
      this.fireEvent(place);
    });
  }

  fireEvent(place) {
    this.setPlace.emit(place);
  }
}
