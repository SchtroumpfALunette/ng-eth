import { EthereumModule } from './ethereum';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { Provider } from './app.provider';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EthereumModule.forRoot(Provider)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
