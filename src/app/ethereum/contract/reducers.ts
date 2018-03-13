import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as actions from './actions';

class ContractDef {
    public address: string;
    public events: string[];
    public methods: string[];
}

export interface State extends EntityState<ContractDef>{

}

export const adapter = createEntityAdapter<ContractDef> ({
    selectId: (contract: ContractDef) => contract.address,
    sortComparer: false
});

const inititalState: State = adapter.getInitialState({

})