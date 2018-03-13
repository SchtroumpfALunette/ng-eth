import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAccounts from './accounts';
import * as fromWallet from './wallet';
import * as fromTransaction from './transactions';

export interface EthState {
    wallet: fromWallet.State,
    accounts: string[],
    transactions: fromTransaction.State
}

export const reducers: ActionReducerMap<EthState> = {
    wallet: fromWallet.reducers,
    accounts: fromAccounts.reducers,
    transactions: fromTransaction.reducers
};
