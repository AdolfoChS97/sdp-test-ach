import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
