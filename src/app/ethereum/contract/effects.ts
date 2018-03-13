import { Injectable } from '@angular/core';
import { ContractService } from './service';
import { NgContract } from './models';

import { Effect, Actions } from '@ngrx/effects';
import { EthError } from './../eth/actions';
import * as actions from './actions';

// RXJS
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ContractEffect {

    constructor(
        private actions$: Actions,
        private contract: ContractService
    ) {}

    @Effect()
    create$ = this.actions$
        .ofType(actions.CREATE_CONTRAT)
        .pipe(
            map((action: actions.CreateContract) => {
                return this.contract.createContract(action.payload.abi, action.payload.address);
            }),
            map((contract: NgContract) => new actions.CreateContractSuccess(contract)),
            catchError((err: any) => of(new EthError(err)))
    );
}
