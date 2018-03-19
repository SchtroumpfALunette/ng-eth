import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
// Web3
import { WEB3 } from './tokens';
const Web3 = require('web3');

// SERVICES
import { AccountsService } from './accounts';
import { ContractService } from './contract';
import { WalletService } from './wallet';

// Components
import { EthIdenticonComponent } from './eth/eth-identicon/eth-identicon.component';

// MODULE FACTORY
// @dynamic
@NgModule({
  imports: [CommonModule],
  declarations: [ EthIdenticonComponent],
  exports: [ EthIdenticonComponent],
  providers: [WalletService, AccountsService, ContractService]
})
export class NgEthModule {
  /**
   * Set the Provider for web3 in the root module
   * @param { Type<any> } web3Provider The web3 provider
   */
  static forRoot(web3Provider: Type<any>): ModuleWithProviders;
  static forRoot(web3Provider: Type<any>): ModuleWithProviders {
    return {
      ngModule: NgEthModule,
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
}
