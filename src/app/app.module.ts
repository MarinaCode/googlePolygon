import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { LocationListComponent } from './location-list/location-list.component';
import { GooglemapComponentComponent } from './googlemap-component/googlemap-component.component';
import { MapSelectionToolsComponent } from './map-selection-tools/map-selection-tools.component';
import { GoogleAutocompleteDirective } from './google-autocomplete.directive';
import {UtilityServiceService} from './utility-service.service';


@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    LocationListComponent,
    GooglemapComponentComponent,
    MapSelectionToolsComponent,
    GoogleAutocompleteDirective
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule
  ],
  providers: [UtilityServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
