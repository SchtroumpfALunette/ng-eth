import { EthState } from '../reducers';

export const getAccounts = (state: EthState) => state.accounts.accounts;
export const getdefaultAccount = (state: EthState) => state.accounts.selected;