import { WalletActions } from './actions';

export interface State {
    accounts: string[];
    loading: boolean;
    loaded: boolean;
}

const initialState: State = {
    accounts: [],
    loading: false,
    loaded: false
}

export const reducers = (state = initialState, action: WalletActions) => {
    switch (action.type) {

        /** WALLET */
        default: {
            return state;
        }
    }
}