import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatInputModule,
  MatTableModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule
} from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./components/signup/signup.component";
import { RsvpTableComponent } from "./components/rsvp-table/rsvp-table.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    RsvpTableComponent,
    DashboardComponent,
    AdminDashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
