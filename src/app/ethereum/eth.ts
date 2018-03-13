import { Injectable, Inject } from '@angular/core';
import { WEB3 } from './tokens';

import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import Web3 from 'web3';

@Injectable()
export class EthService {

    constructor(@Inject(WEB3) private web3: Web3) { }

    /** Return the current blocknumber */
    public getAccounts(): Observable<string[]> {
        return bindNodeCallback(this.web3.eth.getAccounts)();
    }

}