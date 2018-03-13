import { NgContract } from './models';
import { Action } from '@ngrx/store';
import { ABIDefinition, Contract } from 'web3/types';

export const CREATE_CONTRAT = '[Eth] Create Contract';
export const CREATE_CONTRAT_SUCCESS = '[Eth] Create Contract Success';

export const CALL_METHOD = '[Eth] Call Method';
export const SEND_METHOD = '[Eth] Send Method';

export class CreateContract implements Action {
    readonly type = CREATE_CONTRAT;
    constructor(public payload: {abi: ABIDefinition[], address: string}){}
}

export class CreateContractSuccess implements Action {
    readonly type = CREATE_CONTRAT_SUCCESS;
    constructor(public payload: NgContract){}
}

export class CallMethod implements Action {
    readonly type = CALL_METHOD;
    
}