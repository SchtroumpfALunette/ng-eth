import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAccounts from './accounts/reducers';
import * as fromWallet from './wallet/reducers';
import * as fromTransaction from './transactions/reducers';
import * as fromContract from './contract/reducers';

export interface EthState {
    wallet: fromWallet.State,
    accounts: fromAccounts.State,
    transactions: fromTransaction.State,
    contracts: fromContract.State
}

export const ethReducers: ActionReducerMap<EthState> = {
    wallet: fromWallet.reducers,
    accounts: fromAccounts.reducers,
    transactions: fromTransaction.reducers,
    contracts: fromContract.reducers
};
