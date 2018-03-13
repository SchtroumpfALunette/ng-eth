import { Injectable } from '@angular/core';
import { WalletService } from './service';
import { EthError } from './../eth/actions';
import { Wallet } from '../types';

// NGRX
import { Effect, Actions } from '@ngrx/effects';
import * as actions from './actions';
import { of } from 'rxjs/observable/of'; 
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class WalletEffects {

    constructor(private actions$: Actions, private wallet: WalletService) {}


    @Effect()
    FetchingWallet$ = this.actions$.ofType(actions.FETCHING_WALLET).pipe(
        map((action: actions.FetchingWallet) => this.wallet.loadWallet(action.payload)),
        map((wallet: Wallet) => new actions.FetchedWallet(wallet)),
        catchError((err: any) => of(new EthError(err)))
    )
}