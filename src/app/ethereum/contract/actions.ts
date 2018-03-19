import { NgContract } from './models';
import { Action } from '@ngrx/store';
import { ABIDefinition, Contract } from '../types';

export const CREATE_CONTRAT = '[Eth] Create Contract';
export const CREATE_CONTRAT_SUCCESS = '[Eth] Create Contract Success';

export const CALL_METHOD = '[Eth] Call Method';
export const CALL_METHOD_SUCCESS = '[Eth] Call Method Success';

export const SEND_METHOD = '[Eth] Send Method';
export const SEND_METHOD_SUCCESS = '[Eth] Send Method Success';

/**
 * CREATE
 */
export class CreateContract implements Action {
    readonly type = CREATE_CONTRAT;
    constructor(public payload: {name: string, abi: ABIDefinition[], address: string}){}
}

export class CreateContractSuccess implements Action {
    readonly type = CREATE_CONTRAT_SUCCESS;
    constructor(public payload: NgContract){}
}

/**
 * CALL
 */
export class CallMethod implements Action {
    readonly type = CALL_METHOD;
    constructor(public payload: {contract: string, method: string, args: any[]}) {}
}

export class CallMethodSuccess implements Action {
    readonly type = CALL_METHOD_SUCCESS;
    constructor(public payload: {contract: string, method: string, result: any, args: any[]}) {}
}

/**
 * SEND
 */
export class SendMethod implements Action {
    readonly type = SEND_METHOD;
    constructor(public payload: {contract: string, method: string, args: any[]}) {}
}

export class SendMethodSuccess implements Action {
    readonly type = SEND_METHOD_SUCCESS;
    constructor(public payload: string) {}
}

export type ContractActions = 
    | CreateContract
    | CreateContractSuccess
    | CallMethod
    | CallMethodSuccess
    | SendMethod
    | SendMethodSuccess;