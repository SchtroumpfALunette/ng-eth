import { IProvider, BlockType, EventLog, EventEmitter, ABIDefinition, TransactionObject, Contract } from './../types';
import { Observable } from 'rxjs/Observable';
import { Callback } from '../types';

export interface JsonContract {
    contract_name: string;
    abi: ABIDefinition[];
    networks: Object;
}

export interface NgContract {
  name: string,
  options: {
    address: string
    jsonInterface: ABIDefinition[]
    data: string
    from: string
    gasPrice: string
    gas: number
  }
  methods: {
    [fnName: string]: (...args) => Observable<any>
  }
  deploy(options: {
    data: string
    arguments: any[]
  }): TransactionObject<Contract>
  events: {
    [eventName: string]: (options?: {
      filter?: object
      fromBlock?: BlockType
      topics?: string[]
    }, cb?: Callback<EventLog>) => EventEmitter
    allEvents: (options?: { filter?: object, fromBlock?: BlockType, topics?: string[] }, cb?: Callback<EventLog>) => EventEmitter
  },
  getPastEvents(
    event: string,
    options?: {
      filter?: object,
      fromBlock?: BlockType,
      toBlock?: BlockType,
      topics?: string[]
    },
    cb?: Callback<EventLog[]>
  ): Promise<EventLog[]>,
  setProvider(provider: IProvider): void
}