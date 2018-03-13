import { Injectable, Inject } from '@angular/core';
import { WEB3 } from './../tokens';
import Web3 from 'web3';
// Models
import { NgContract } from './models';
import { Contract, TransactionObject, ABIDefinition } from '../types';
import { ContractOptions } from './types';

// RXJS
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';

@Injectable()
export class ContractService {

    public contracts: {
        [name: string]: NgContract
    } = {};
    
    constructor(@Inject(WEB3) private web3: Web3) {}

    /**
     * Creates a new contract instance with all its methods and events defined in its json interface object.
     * @param jsonInterface The json interface for the contract to instantiate
     * @param address The address of the smart contract to call, can be added later using 
     * @param options The options of the contract. Some are used as fallbacks for calls and transactions:
     */
    public createContract(abi: ABIDefinition[], address: string, options?: ContractOptions): NgContract {
        const contract = new this.web3.eth.Contract(abi, address, options);
        const ngContract: NgContract = { ...contract } as any;
        abi.forEach((def: ABIDefinition) => {
            if (def.type === 'function' && def.constant === true) {
                // Call function
                const method = contract.methods[def.name];
                const ngMethod = (...args: any[]) => {
                    return bindNodeCallback<any>(method(...args)['call'])();
                }
                ngContract.methods[def.name] = ngMethod;
            } else if (def.type === 'function' && def.constant === false) {
                // Send function
            } else if (def.type === 'tuple') {
                // Decode hex of struct
            } else if (def.type === 'tuple[]') {
                // Decode hex of array of struct
            }
        });
        this.contracts[address] = ngContract;
        return ngContract;
    }
}