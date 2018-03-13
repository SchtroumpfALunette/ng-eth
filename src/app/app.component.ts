import { Component, Inject, OnInit } from '@angular/core';
// ETH
import Web3 from 'web3';
import { ContractService, WalletService, EthService, Wallet } from './ethereum';
import { WEB3 } from './ethereum/tokens';
import { abi } from './abi/nexium';
// NGRX
import { Store, select } from '@ngrx/store';
import { EthState } from './ethereum/reducers';
import { GetAccounts } from './ethereum/accounts';

// RXJS
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public hdwallet: Wallet;
  public address$: Observable<string>;
  public addresses$: Observable<string[]>;

  constructor(private store: Store<EthState>) {}

  ngOnInit() {
    this.store.dispatch( new GetAccounts() );
    this.addresses$ = this.store.pipe(select((state: EthState) => state.accounts));
  }

}
