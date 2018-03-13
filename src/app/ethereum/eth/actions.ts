import { Action } from '@ngrx/store';

export const ETH_ERROR = '[Eth] Error';

export class EthError implements Action {
    readonly type = ETH_ERROR;
    constructor(public payload: any){}
}

export type EthActions = 
    | EthError;