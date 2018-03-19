export interface Asset {
    name: string;
    assetAddress: string;
    code: number;
    symbol: string;
    decimals: number;
    createdSupply: number;
    totalSupply: number,
    burnAddress: string;
    isLocked: boolean;
    identifier: string;
    assetType: string;
    version: string;
    origin: string;
    registerDate: number;
}