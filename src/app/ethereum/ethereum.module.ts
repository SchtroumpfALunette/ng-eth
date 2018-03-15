import { NgModule, Inject, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEB3 } from './tokens';
import { environment } from './../../environments/environment';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { AccountsEffects } from './accounts';
import { WalletEffects } from './wallet';

// SERVICES
import { EthService } from './eth';
import { ContractService } from './contract';
import { WalletService, WalletComponent } from './wallet';
import { Provider } from '../app.provider';
import { EthIdenticonComponent } from './eth/eth-identicon/eth-identicon.component';
const Web3 = require('web3');

// MODULE FACTORY
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AccountsEffects, WalletEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  declarations: [WalletComponent, EthIdenticonComponent],
  exports: [WalletComponent, EthIdenticonComponent],
  providers: [WalletService, EthService, ContractService]
})
export class EthereumModule {
  /**
   * Set the Provider for web3 in the root module
   * @param { Type<any> } web3Provider The web3 provider
   */
  static forRoot(web3Provider: Type<any>): ModuleWithProviders;
  static forRoot(web3Provider: Type<any>): ModuleWithProviders {
    return {
      ngModule: EthereumModule,
      providers: [
        web3Provider,
        {
          provide: WEB3,
          useFactory: (provider: any) => new Web3(Web3.givenProvider || provider.provider),
          deps: [web3Provider]
        }
      ]
    }
  }

  /**
   * Module for Feature Module
   */
  static forFeature(): ModuleWithProviders;
  static forFeature(): ModuleWithProviders {
    return {
      ngModule: EthereumModule,
      providers: []
    }
  }
}


export function createSourceInstances(...instances: any[]) {
  return instances;
}