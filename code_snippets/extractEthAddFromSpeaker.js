function worker({
    input,
    agent_public_key
}, data, state) {

    // write a function in js that takes a string and returns all ethereum wallet addreseses as an array
    function getEthereumWallets(str) {
        const regex = /0x[a-fA-F0-9]{40}/g;
        return str.match(regex);
    }

    const wallets = getEthereumWallets(input);
    console.log('wallets')

    for (let i = 0; i < wallets.length; i++) {
        if (wallets[i] === agent_public_key || 
            wallets[i] === "0x0000000000000000000000000000000000000000"
        ) {
            wallets.splice(i, 1);
        }
    }

    if (wallets.length > 0) {
        return { output: wallets[0] };
    }

    return { output: null };

}


// test cases

const agentWalletAddress = "0x83B6Ac442842f63aa5791E8D7c6E9B737B795754";

const testWalletAddress = "0x0000000000000000000000000000000000000000";

console.log('start test')
// test worker function
const testResult = worker({ input: "0x0000000000000000000000000000000000000000", agent_public_key: agentWalletAddress }, null, null);
console.log('testResult', testResult)
// try another testWalletAddress, not a 0x
const testResult2 = worker({ input: "0x83B6Ac442842f63aa5791E8D7c6E9B737B795754", agent_public_key: agentWalletAddress }, null, null);
console.log('testResult2', testResult2)
const testResult3 = worker({ input: "0x7AEf5c888869c32f27460d0BD08c25923c5a55fe", agent_public_key: agentWalletAddress }, null, null);
console.log('testResult3', testResult3)