import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/in-memory-data.service";

import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule, MatTableModule, MatButtonModule } from "@angular/material";
import {CdkTableModule} from '@angular/cdk/table';

import { AppComponent } from "./app.component";
import { SignupComponent } from "./components/signup/signup.component";
import { RsvpTableComponent } from "./components/rsvp-table/rsvp-table.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    RsvpTableComponent,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
