import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import ZeroClientProvider from 'web3-provider-engine/zero';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';

@Injectable()
export class Provider {

    constructor() {}

    get provider() {
        return ZeroClientProvider({
            getAccounts: (cb) => {

            },
            processTransaction: (cb) => {
                
            }
        });
    }
}
