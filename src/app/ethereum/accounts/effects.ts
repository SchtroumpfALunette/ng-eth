import { Injectable } from '@angular/core';

import { EthService } from './../eth';
// NGRX
import { Effect, Actions } from '@ngrx/effects';
import { EthError } from './../eth/actions';
import { GET_ACCOUNTS, GetAccountsSuccess } from './actions';

// RXJS
import { of } from 'rxjs/observable/of';
import { tap, switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AccountsEffects {

    constructor(private actions$: Actions, private eth: EthService) {}

    @Effect()
    GetAccounts$ = this.actions$.ofType(GET_ACCOUNTS).pipe(
        switchMap(() => this.eth.getAccounts()),
        map((accounts: string[]) => new GetAccountsSuccess(accounts)),
        catchError((err: any) => of(new EthError(err)))
    )
    
}
