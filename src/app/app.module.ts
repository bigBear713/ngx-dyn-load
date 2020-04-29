import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routing';
import { dynLoadModulsList } from './config/dyn-load';
import { DYN_LOAD } from './config/tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
  ],
  providers: [
    //  ng9 中动态加载变得更容易
    // { provide: DYN_LOAD, useFactory: dynLoadModulsList }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
