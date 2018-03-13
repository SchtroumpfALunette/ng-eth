import {  GET_ACCOUNTS_SUCCESS, AccountsActions } from './actions';

export const reducers = (state = [], action: AccountsActions): string[] => {
    switch (action.type) {
        /** ACCOUNTS */
        case (GET_ACCOUNTS_SUCCESS): {
            return action.payload;
        };
        /** WALLET */
        default: {
            return state;
        }
    }
}
