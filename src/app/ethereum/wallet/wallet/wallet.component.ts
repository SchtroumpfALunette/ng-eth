import { WEB3 } from './../../tokens';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Wallet, Account } from '../../types';
import { WalletService } from './../service';

@Component({
  selector: 'eth-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public accounts: Account[] = [];
  @Input() set wallet(wallet: Wallet) {
    for (let i = 0; i < wallet.length; i++) {
      this.accounts = [...this.accounts, wallet[i]];
    }
  };

  constructor(private walletService: WalletService) { }

  public selectAccount(account: Account) {
    this.walletService.defaultAccount = account.address;
  }

  ngOnInit() {
  }

}
