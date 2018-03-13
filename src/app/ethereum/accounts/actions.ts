import { Action } from '@ngrx/store';

/**********
 * ACCOUNTS
 */
export const GET_ACCOUNTS = '[Eth] Get Accounts';
export const GET_ACCOUNTS_SUCCESS = '[Eth] Get Accounts Success';

export class GetAccounts implements Action {
    readonly type = GET_ACCOUNTS;
}

export class GetAccountsSuccess implements Action {
    readonly type = GET_ACCOUNTS_SUCCESS;
    constructor(public payload: string[]){}
}

export type AccountsActions = 
    | GetAccounts
    | GetAccountsSuccess;