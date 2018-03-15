import { environment } from './../../../environments/environment';
import { decodeOutPutStruct } from './utils/struct';
import { Injectable, Inject } from '@angular/core';
import { WEB3 } from './../tokens';
import Web3 from 'web3';
// Models
import { NgContract } from './models';
import { Contract, TransactionObject, ABIDefinition } from '../types';
import { ContractOptions } from './types';

// RXJS
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { map, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

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
        const ngContract: NgContract = { ...contract, methods: {} } as any;
        
        /** Check if function returns a Struct */
        const hasTuple = (def: ABIDefinition): boolean => {
            const outputTypes = def.outputs.map((output) => output.type);
            return outputTypes.indexOf('tuple') !== -1 || outputTypes.indexOf('tuple[]') !== -1;
        }
        
        abi.forEach((def: ABIDefinition) => {
            if (def.type === 'function' && def.constant === true) {
                // Call function
                if (hasTuple(def)) {
                    // Call Function returns a Struct or Array of Struct
                    const ngMethod = (...args: any[]) => {
                        const method = this.web3.eth.call({
                            to: address,
                            data: contract.methods[def.name](...args).encodeABI()
                        }).then((hex: string) => decodeOutPutStruct(hex, abi, def.name));
                        return fromPromise<any>(method);
                    }
                    ngContract.methods[def.name] = ngMethod;
                } else {
                    // Call Function without Structs
                    const ngMethod = (...args: any[]) => {
                        const method = contract.methods[def.name];
                        const call = method(...args)['call'];
                        return bindNodeCallback<any>(call)();
                    }
                    ngContract.methods[def.name] = ngMethod;
                }

            } else if (def.type === 'function' && def.constant === false) {
                // Send function
                const ngMethod = (...args: any[]) => {
                    const method = contract.methods[def.name];
                    const send = method(...args)['send']          
                    return bindNodeCallback<any>(send)();
                }
                ngContract.methods[def.name] = ngMethod;
            }
        });
        this.contracts[address] = ngContract;
        return ngContract;
    }
}