import { Injectable } from '@angular/core';
import { ContractService } from './service';
import { NgContract } from './models';

// NGRX
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { EthError } from './../eth/actions';
import * as actions from './actions';

// RXJS
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ContractEffect {

    constructor(
        private actions$: Actions,
        private contract: ContractService
    ) {}

    @Effect()
    create$: Observable<Action> = this.actions$
        .ofType(actions.CREATE_CONTRAT)
        .pipe(
            map((action: actions.CreateContract) => {
                const { name, abi, address } = action.payload;
                return this.contract.createContract(name, abi, address);
            }),
            map((contract: NgContract) => new actions.CreateContractSuccess(contract)),
            catchError((err: any) => of(new EthError(err)))
        );

    @Effect()
    callMethod$: Observable<any> = this.actions$
        .ofType(actions.CALL_METHOD)
        .pipe(
            switchMap((action: actions.CallMethod) => {
                const {contract, method, args } = action.payload;
                return this.contract.contracts[contract].methods[method](...args)
                    .pipe(
                        map((result: any) => new actions.CallMethodSuccess({
                            contract,
                            method,
                            result,
                            args
                        }))
                    )
            }),
            catchError((err: any) => of(new EthError(err)))
        );
}
