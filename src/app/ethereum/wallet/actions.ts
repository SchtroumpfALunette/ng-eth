import { Action } from '@ngrx/store';
import { Wallet } from '../types';

/********
 * WALLET
 */
export const FETCHING_WALLET = '[Eth] Fetching Wallet';
export const FETCHED_WALLET = '[Eth] Fetched Wallet';

export class FetchingWallet implements Action {
    readonly type = FETCHING_WALLET;
    constructor(public payload: string){}
}

export class FetchedWallet implements Action {
    readonly type = FETCHED_WALLET;
    constructor(public payload: Wallet){}
}

export type WalletActions =
    | FetchingWallet
    | FetchedWallet;