import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import * as actions from './actions';

export class ContractDef {
    public address: string;
    public events: string[];
    public methods: string[];
}

export interface State extends EntityState<ContractDef>{

}

export const adapter: EntityAdapter<ContractDef> = createEntityAdapter<ContractDef> ({
    selectId: (contract: ContractDef) => contract.address,
    sortComparer: false
});

const inititalState: State = adapter.getInitialState({

})