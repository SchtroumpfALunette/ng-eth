import { Component, OnInit } from '@angular/core';
// Library 
import { Asset } from './../library';
import { abi as libraryAbi } from '../library.abi';

// ETH
import Web3 from 'web3';
import { ContractService } from '../../../ethereum';
import { AccountsService, GetAccounts, getAccounts } from './../../../ethereum/accounts';

// NGRX
import { Store, select } from '@ngrx/store';
import { EthState } from '../../../ethereum/reducers';

// RXJS
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'eth-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  public addresses$: Observable<string[]>;
  public assets$: Observable<Asset[]>;

  constructor(
    private store: Store<EthState>,
    private contract: ContractService,
    private accounts: AccountsService
  ) {}

  ngOnInit() {
    this.store.dispatch( new GetAccounts() );

    const library = this.contract.createContract('library', libraryAbi, environment.addresses.library);
    // Redux way : 
    this.store.dispatch(this.contract.action('library', 'getAllAssets'));
    // Service based way: 
    this.assets$ = this.contract.call('library', 'getAllAssets');
    
    this.store.dispatch( new GetAccounts() );

    this.addresses$ = this.store.pipe(select(getAccounts));
  }
}
