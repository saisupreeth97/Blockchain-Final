import ECIES from 'eth-ecies';
const Web3 = require('web3');
const EthCrypto = require('eth-crypto');


export const getPrivateKey = async function (account) {
    let keys = window.localStorage.getItem("keys");

    if (keys) {
        try {
            keys = JSON.parse(keys);
        } catch (error) {
            console.error('Error parsing keys from local storage:', error);
            keys = null;
        }
    }

    if (!keys) {
        keys = {};
    }

    if (!(account in keys)) {
        let obj = await EthCrypto.createIdentity();
        keys[account] = {
            "public": obj.publicKey,
            "private": obj.privateKey
        };
        window.localStorage.setItem("keys", JSON.stringify(keys));
    }
    return keys[account].private;
}

// export const getPublicKey = async function (account) {
//     let keys = window.localStorage.getItem("keys");
//     console.log(keys);
//     if (keys) {
//         if ((account in keys) === false) {
//             let obj = await EthCrypto.createIdentity();
//             keys[account] = {
//                 "public": obj.publicKey,
//                 "private": obj.privateKey
//             };
//             window.localStorage.setItem("keys", keys);
//         }
//     } else {
//         let obj = await EthCrypto.createIdentity();
//         let keys = {
//             account: {
//                 "public": obj.publicKey,
//                 "private": obj.privateKey
//             }
//         };
//         window.localStorage.setItem("keys", keys);
//     }
//     return keys[account].public;
// }

export const getPublicKey = async function (account) {
    let keys = window.localStorage.getItem("keys");

    if (keys) {
        try {
            keys = JSON.parse(keys);
        } catch (error) {
            console.error('Error parsing keys from local storage:', error);
            keys = null;
        }
    }

    if (!keys) {
        keys = {};
    }

    if (!(account in keys)) {
        let obj = await EthCrypto.createIdentity();
        keys[account] = {
            "public": obj.publicKey,
            "private": obj.privateKey
        };
        window.localStorage.setItem("keys", JSON.stringify(keys));
    }
    return keys[account].public;
}

export const get_secret = async function (b_pub_key,secret_item_string) {

    // const publicKey = await getPublic(b_pub_key)
    const publickey = await getPublicKey(b_pub_key);
    const privatekey = await getPrivateKey(b_pub_key);
    console.log(publickey,"public key");
    console.log(privatekey,"private key")
    const encrypted_message = await EthCrypto.encryptWithPublicKey(
        publickey, // publicKey
        secret_item_string // message
    );
    
    //convert the cypher text to string off chain
    let secret_cipher_string = await EthCrypto.cipher.stringify(encrypted_message);

    return secret_cipher_string;
   
   
}

