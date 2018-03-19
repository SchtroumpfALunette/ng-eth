import { ABIDefinition } from '../../ethereum/types';
/**
 * Created by remaj on 08/01/2018.
 */
export const abi: ABIDefinition[] = [
    {
        constant: true,
        inputs: [
            {
                name: 'a',
                type: 'address'
            }
        ],
        name: 'getAssetByAddress',
        outputs: [
            {
                components: [
                    {
                        name: 'assetAddress',
                        type: 'address'
                    },
                    {
                        name: 'code',
                        type: 'uint16'
                    },
                    {
                        name: 'name',
                        type: 'string'
                    },
                    {
                        name: 'symbol',
                        type: 'string'
                    },
                    {
                        name: 'decimals',
                        type: 'uint8'
                    },
                    {
                        name: 'createdSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'totalSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'burnAddress',
                        type: 'address'
                    },
                    {
                        name: 'isLocked',
                        type: 'bool'
                    },
                    {
                        name: 'identifier',
                        type: 'string'
                    },
                    {
                        name: 'assetType',
                        type: 'string'
                    },
                    {
                        name: 'version',
                        type: 'string'
                    },
                    {
                        name: 'origin',
                        type: 'address'
                    },
                    {
                        name: 'registerDate',
                        type: 'uint256'
                    }
                ],
                name: '',
                type: 'tuple'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getAllAssets',
        outputs: [
            {
                components: [
                    {
                        name: 'assetAddress',
                        type: 'address'
                    },
                    {
                        name: 'code',
                        type: 'uint16'
                    },
                    {
                        name: 'name',
                        type: 'string'
                    },
                    {
                        name: 'symbol',
                        type: 'string'
                    },
                    {
                        name: 'decimals',
                        type: 'uint8'
                    },
                    {
                        name: 'createdSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'totalSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'burnAddress',
                        type: 'address'
                    },
                    {
                        name: 'isLocked',
                        type: 'bool'
                    },
                    {
                        name: 'identifier',
                        type: 'string'
                    },
                    {
                        name: 'assetType',
                        type: 'string'
                    },
                    {
                        name: 'version',
                        type: 'string'
                    },
                    {
                        name: 'origin',
                        type: 'address'
                    },
                    {
                        name: 'registerDate',
                        type: 'uint256'
                    }
                ],
                name: '',
                type: 'tuple[]'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'user',
                type: 'address'
            }
        ],
        name: 'getAllBalancesOf',
        outputs: [
            {
                name: '',
                type: 'uint256[]'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'user',
                type: 'address'
            },
            {
                name: 'assetAddress',
                type: 'address'
            }
        ],
        name: 'getBalanceOf',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            {
                name: 'newAsset',
                type: 'address'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'symbol',
                type: 'string'
            },
            {
                name: 'identifier',
                type: 'string'
            },
            {
                name: 'assetType',
                type: 'string'
            },
            {
                name: 'version',
                type: 'string'
            },
            {
                name: 'origin',
                type: 'address'
            }
        ],
        name: 'register',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            {
                name: 'factory',
                type: 'address'
            }
        ],
        name: 'setFactory',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getAssetCount',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'assetFactory',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'index',
                type: 'uint256'
            }
        ],
        name: 'getAssetAddress',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'index',
                type: 'uint256'
            }
        ],
        name: 'getAsset',
        outputs: [
            {
                components: [
                    {
                        name: 'assetAddress',
                        type: 'address'
                    },
                    {
                        name: 'code',
                        type: 'uint16'
                    },
                    {
                        name: 'name',
                        type: 'string'
                    },
                    {
                        name: 'symbol',
                        type: 'string'
                    },
                    {
                        name: 'decimals',
                        type: 'uint8'
                    },
                    {
                        name: 'createdSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'totalSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'burnAddress',
                        type: 'address'
                    },
                    {
                        name: 'isLocked',
                        type: 'bool'
                    },
                    {
                        name: 'identifier',
                        type: 'string'
                    },
                    {
                        name: 'assetType',
                        type: 'string'
                    },
                    {
                        name: 'version',
                        type: 'string'
                    },
                    {
                        name: 'origin',
                        type: 'address'
                    },
                    {
                        name: 'registerDate',
                        type: 'uint256'
                    }
                ],
                name: 'asset',
                type: 'tuple'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'nexiumAddress',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        name: 'assetAddress',
                        type: 'address'
                    },
                    {
                        name: 'code',
                        type: 'uint16'
                    },
                    {
                        name: 'name',
                        type: 'string'
                    },
                    {
                        name: 'symbol',
                        type: 'string'
                    },
                    {
                        name: 'decimals',
                        type: 'uint8'
                    },
                    {
                        name: 'createdSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'totalSupply',
                        type: 'uint256'
                    },
                    {
                        name: 'burnAddress',
                        type: 'address'
                    },
                    {
                        name: 'isLocked',
                        type: 'bool'
                    },
                    {
                        name: 'identifier',
                        type: 'string'
                    },
                    {
                        name: 'assetType',
                        type: 'string'
                    },
                    {
                        name: 'version',
                        type: 'string'
                    },
                    {
                        name: 'origin',
                        type: 'address'
                    },
                    {
                        name: 'registerDate',
                        type: 'uint256'
                    }
                ],
                indexed: false,
                name: 'asset',
                type: 'tuple'
            }
        ],
        name: 'NewAsset',
        type: 'event'
    }
];