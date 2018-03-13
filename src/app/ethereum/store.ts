import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Wallet } from './types';

export interface Action {
    readonly type: string;
}

export const GET_ACCOUNTS = '[Eth] Get Accounts';
export class GetAccounts implements Action {
    readonly type = GET_ACCOUNTS;
    constructor(public payload: string) {}
}

@Injectable()
export class EthStore {

    /** Name of the local storage */
    public keyName: string;
    public accounts = new BehaviorSubject<string[]>([]);
    public transactions: string[];

    public actionObservable = new BehaviorSubject<Action>({type: 'Init'});

    constructor() {}

    public dispatch(action: Action) {
        this.actionObservable.next(action);
    }

    /** Return the accounts of a wallet */
    public getAccounts(wallet: Wallet) {
        let accounts = [];
        for (let i = 0; i < wallet.length; i++) {
            accounts = [...accounts, wallet[i]];
        }
        this.accounts.next(accounts.map((account) => account.address));
    }

}