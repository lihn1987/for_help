import logo from './logo.svg';
import React from 'react';
import './App.css';

import sha256 from 'crypto-js/sha256';
import axios from 'axios'
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';
import {create} from '@phala/sdk';
/*
此处若复制node_module/@phala的文件夹后
改名为@phala_b 修改node_module/@phala_b/sdk/disk/index.js的109行为
import * as $protobuf from "protobufjs";则此处不会出错
*/
// import {create} from '@phala_b/sdk';
var metadata = {
  "source": {
    "hash": "0x34b0c4750206d75939f8670efd16334b4f9134517758cb673748b5919a02b985",
    "language": "ink! 3.3.0",
    "compiler": "rustc 1.64.0-nightly"
  },
  "contract": {
    "name": "pass_save",
    "version": "0.1.0",
    "authors": [
      "Hang Yin <hangyin@phala.network>"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [],
          "docs": [],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [],
      "messages": [
        {
          "args": [],
          "docs": [],
          "label": "create_pwd",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [],
            "type": 2
          },
          "selector": "0x503ba197"
        },
        {
          "args": [
            {
              "label": "plaintext",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "encrypt",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 6
          },
          "selector": "0xc842034c"
        },
        {
          "args": [
            {
              "label": "ciphertext",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "decrypt",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 6
          },
          "selector": "0x90df3b6a"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "user_password"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 4,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 2
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 2,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 3
            }
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 2,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "Key"
          ]
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "sequence": {
              "type": 3
            }
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 5
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 7
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 5
            },
            {
              "name": "E",
              "type": 7
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "BadOrigin"
                },
                {
                  "index": 1,
                  "name": "BadgeContractNotSetUp"
                },
                {
                  "index": 2,
                  "name": "InvalidUrl"
                },
                {
                  "index": 3,
                  "name": "RequestFailed"
                },
                {
                  "index": 4,
                  "name": "NoClaimFound"
                },
                {
                  "index": 5,
                  "name": "InvalidAddressLength"
                },
                {
                  "index": 6,
                  "name": "InvalidAddress"
                },
                {
                  "index": 7,
                  "name": "NoPermission"
                },
                {
                  "index": 8,
                  "name": "InvalidSignature"
                },
                {
                  "index": 9,
                  "name": "UsernameAlreadyInUse"
                },
                {
                  "index": 10,
                  "name": "AccountAlreadyInUse"
                },
                {
                  "index": 11,
                  "name": "FailedToIssueBadge"
                },
                {
                  "index": 12,
                  "name": "CannotEncrypt"
                },
                {
                  "index": 13,
                  "name": "CannotDecrypt"
                }
              ]
            }
          },
          "path": [
            "pass_save",
            "pass_save",
            "Error"
          ]
        }
      }
    ]
  }
}
function App() {
  web3Enable('my cool dapp').then((e)=>{


    // 配置phala contract
    let self = this
    const pha_wsProvider = new WsProvider('wss://poc5.phala.network/ws');
    ApiPromise.create({
        provider: pha_wsProvider,
    }).then((api_tmp) => {
      console.log("pha_api created")
      const contractId = '0x62ede2a632e7440ec8d71d02eed960b27d31eaceba7600a7f6910ef243acbd04';  // your contract id
      const baseURL = 'https://poc5.phala.network/tee-api-1'
      console.log(create)
      create({api: api_tmp, baseURL:baseURL, contractId:contractId}).then(function(p){
        console.log("phala api:", p)
        /*
        解决了'@phala_b/sdk'后，这里会报错，我就不知道该如何解决了
        */
        const contract = new ContractPromise(p, metadata, contractId)
        console.log("phala contract:", contract)
      })
    });
    
    // Create a contract object with the metadata and the contract id.
    // const pruntimeURL = 'http://127.0.0.1:8000';  // assuming the default port
    



  })


  return (
    <div className="App">
      aabb
    </div>
  );
}


export default App;