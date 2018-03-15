import { Injectable } from '@angular/core';

import { EthService } from './../eth';
// NGRX
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { EthError } from './../eth/actions';
import { GET_ACCOUNTS, GetAccountsSuccess } from './actions';

// RXJS
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AccountsEffects {

    constructor(private actions$: Actions, private eth: EthService) {}

    @Effect()
    GetAccounts$: Observable<Action> = this.actions$
        .ofType(GET_ACCOUNTS)
        .pipe(
            switchMap(() => this.eth.getAccounts()),
            map((accounts: string[]) => new GetAccountsSuccess(accounts)),
            catchError((err: any) => of(new EthError(err)))
        )
    
}
