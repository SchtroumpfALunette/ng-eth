import { Injectable, Inject } from '@angular/core';
import { WEB3 } from './../tokens';
import Web3 from 'web3';
import { decodeOutPutStruct } from './utils/struct';
import { environment } from './../../../environments/environment';

// Models
import { NgContract } from './models';
import { Contract, TransactionObject, ABIDefinition } from '../types';
import { ContractOptions } from './types';
// NGRX
import { Store } from '@ngrx/store';
import { EthState } from './../reducers';
import { EthError } from './../eth/actions';
import { CallMethod, CallMethodSuccess } from './actions';

// RXJS
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { map, tap, catchError } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class ContractService {

    /** Contracts stored Contract Service */
    public contracts: {
        [name: string]: NgContract
    } = {};
    /** The types of all actions of all contacts link to a method */
    public actionTypes: {
        call: string[];
        send: string[];
        event: string[];
    } = { call: [], send: [], event: [] };
    
    constructor(@Inject(WEB3) private web3: Web3, private store: Store<EthState>) {}

    /**
     * Creates a new contract instance with all its methods and events defined in its json interface object.
     * @param name The name of the contract used to store in the service
     * @param jsonInterface The json interface for the contract to instantiate
     * @param address The address of the smart contract to call, can be added later using 
     * @param options The options of the contract. Some are used as fallbacks for calls and transactions:
     */
    public createContract(name: string, abi: ABIDefinition[], address: string, options?: ContractOptions): NgContract {
        const contract = new this.web3.eth.Contract(abi, address, options);
        const ngContract: NgContract = {
            ...contract,
            name: name,
            methods: {}
        } as any;
        
        /** Check if function returns a Struct */
        const hasTuple = (def: ABIDefinition): boolean => {
            const outputTypes = def.outputs.map((output) => output.type);
            return outputTypes.indexOf('tuple') !== -1 || outputTypes.indexOf('tuple[]') !== -1;
        }
        
        abi.forEach((def: ABIDefinition) => {
            if (def.type === 'function' && def.constant === true) {
                this.createActionType(name, def.name, 'call');
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
                this.createActionType(name, def.name, 'send');
                // Send function
                const ngMethod = (...args: any[]) => {
                    const method = contract.methods[def.name];
                    const send = method(...args)['send']          
                    return bindNodeCallback<any>(send)();
                }
                ngContract.methods[def.name] = ngMethod;
            }
        });
        this.contracts[name] = ngContract;
        return ngContract;
    }

    /**
     * Remove the contract from the service
     * @param contract The name of the contract
     */
    public removeContract(contract: string) {
        this.contracts[contract] = undefined;
    }

    /**
     * Register a new action for a method / event of a contract
     * @param contractName The name of the contract
     * @param method The name of the method
     * @param methodType call, send of event
     */
    private createActionType(contractName: string, methodName: string, methodType: 'call' | 'send' | 'event') {
        const type = `[Contract ${contractName}] ${methodType} ${methodName}`;
        this.actionTypes[methodType].push(type);
    }

    /**
     * Dispatch a CallMethod action
     * @param contract The name of the contract to call
     * @param method The name of the method to call
     */
    public dispatch(contract: string, method: string, ...args: any[]) {
        this.store.dispatch( new CallMethod({contract, method, args}) );
    }

    /**
     * Make a call request on a method of a contract
     * @param contract The name of the contract
     * @param method The name of the method to call
     * @param args The arguments to use for this method
     */
    public call(contract: string, method: string, ...args: any[]): Observable<any> {
        return this.contracts[contract].methods[method](...args);
    }

    public action(contract: string, method: string, ...args: any[]) {
        return {
            type : `[Contract ${contract}] call ${method}`,
            payload: { contract, method, args }
        };
    }

    public effect(contract: string, method: string, ...args: any[]) {
        return this.call(contract, method, args).pipe(
            map((result: any) => {
                return new CallMethodSuccess({contract, method, result, args})
            }),
            catchError((err: any) => of(new EthError(err)))
        );
    }



}