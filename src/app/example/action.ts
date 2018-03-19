import { Action } from '@ngrx/store';
import { CallMethod } from './../ethereum/contract/actions';

export class GetAllAssets extends CallMethod{
    constructor() {
        super({
            contract: 'library',
            method: 'getAllAssets',
            args: [],
        })
    }
}
