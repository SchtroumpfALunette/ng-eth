import { Injectable, Inject } from '@angular/core';

// Etherum
import { WEB3 } from '../tokens';
import Web3 from 'web3';
import { Wallet, Account } from '../types/types';
import * as hdkey from 'ethereumjs-wallet/hdkey';
import * as bip39 from 'bip39';

// RXJS
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class WalletService {

    constructor(@Inject(WEB3) private web3) {}

    /***************************
     * HD WALLET
     */

    /** Generate a bip39 based 12 words mnemonic */
    public mnemonic(): string {
        return bip39.generateMnemonic();
    }

    /**
     * Create a new HDWallet
     * @param accountAmount The amount of account to create in this wallet
     */
    public newHDWallet(accountAmount?: number): Wallet {
        return this.createHDWallet(null, accountAmount);
    }

    /**
     * Recover an HDWallet
     * @param mnemonic The 12 mnemonics as one string
     * @param accountAmount The amount of account to create in this wallet  
     */
    public recoverHDWallet(mnemonic: string, accountAmount?: number): Wallet {
        return this.createHDWallet(mnemonic, accountAmount);
    }

    /**
     * Create an HD Wallet based on 12 mnemonics
     * @param words The 12 mnemonics as one string
     * @param accountAmount The amount of account to create in this wallet
     */
    private createHDWallet(words?: string, accountAmount?: number): Wallet {
        /** Normalise the amount of accounts */
        const setAmount = (number: number) => {
            if (number < 1) {
                return 1;
            } else if (number > 9) {
                return 9;
            } else {
                return number;
            }
        }

        const mnemonic = words ? words : bip39.generateMnemonic();
        const seed = bip39.mnemonicToSeed(mnemonic);
        const hdWallet = hdkey.fromMasterSeed(seed);
        const web3Wallet = this.web3.eth.accounts.wallet.create();
        const amount = accountAmount ? setAmount(accountAmount) : 1;
        const hdpath = "m/44'/60'/0'/0/";

        for (let i = 0; i < amount; i++) {
            const wallet = hdWallet.derivePath(hdpath + i).getWallet();
            const privKey = wallet.getPrivateKeyString();
            const account = web3Wallet.add(privKey);
        }
        return web3Wallet;
    }

    /********************
     * KEYSTORE
     */
    public saveWallet(wallet: Wallet, password: string) {
        wallet.save(password);
    }

    public loadWallet(password: string): Wallet {
        return this.web3.eth.accounts.wallet.load(password);
    }

    /********************
     * SIGNATURE
     */
    public sign(message: string, privateKey: string) {
        
    }
}
