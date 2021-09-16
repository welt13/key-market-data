import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarkeTableComponent } from './components/marke-table/marke-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material.module';
import { ThousandSuffixesPipe } from './pipes/thousand-suffixes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MarkeTableComponent,
    ThousandSuffixesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
