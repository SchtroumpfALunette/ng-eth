/** The options of the contract. Some are used as fallbacks for calls and transactions: */
export interface ContractOptions {
    /** The address transactions should be made from. */
    from?: string;
    /** The gas price in wei to use for transactions. */
    gasPrice?: any;
    /** The maximum gas provided for a transaction (gas limit). */
    gas?: number;
    /** The byte code of the contract. Used when the contract gets deployed. */
    data?: string;
}