import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';

// ETH
import { NgEthModule, ethEffects, ethReducers } from './ethereum';
import { Provider } from './app.provider';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
// TEST
import { LibraryModule } from './example/library/library.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgEthModule.forRoot(Provider),
    LibraryModule,

    StoreModule.forRoot(ethReducers),
    EffectsModule.forRoot([...ethEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
