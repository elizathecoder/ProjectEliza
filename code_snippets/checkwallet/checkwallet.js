import ethers from 'ethers';

// write a function that checks an address for NFTs using ethers and any other framework you want

// infura polygon mainnet
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
let etherscanProvider = new ethers.providers.EtherscanProvider();

const checkEthBalance = async (address) => {
    const balance = await provider.getBalance(address);
    const resultInEth = ethers.utils.formatEther(balance).toString();
    return resultInEth;
}

const checkBalanceForERC20 = async (walletAddress, contractAddress) => {
    const erc20Abi = [
        // Some details about the token
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        // Get the account balance
        "function balanceOf(address) view returns (uint)",

        // Send some of your tokens to someone else
        "function transfer(address to, uint amount)",


    ]
    const contract = new ethers.Contract(contractAddress, erc20Abi, provider);
    const balance = await contract.balanceOf(walletAddress);
    return balance;
}

const getRecentTransactionsForWallet = async (walletAddress) => {
    const transactions = await etherscanProvider.getHistory(walletAddress);
    return transactions;
}

const checkForRecentTransactionFromWalletToWallet = async (walletAddress, walletAddress2) => {
    // check if there is a recent transaction from walletAddress to walletAddress2
    // if there is, return the transaction
    // if there is not, return null
    const transactions = await etherscanProvider.getHistory(walletAddress);
    console.log('transactions', transactions)
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].to === walletAddress2) {
            return transactions[i];
        }
    }
    return null;
}

// test cases

const testAddress = "0xD2e62C19d31A987870f1582163A99702E3628D5E";

(async function (){
    // const result = await checkEthBalance(testAddress);
    // // parse the result
    // console.log('resultInEth', result);

    const result3 = await checkBalanceForERC20(testAddress, "0xfb5453340C03db5aDe474b27E68B6a9c6b2823Eb");
    console.log('result3', result3);

    // const recentTransactionsForWallet = await getRecentTransactionsForWallet(testAddress);
    // console.log('getRecentTransactionsForWallet', recentTransactionsForWallet);

    // const recentTransactionFromWalletToWallet = await checkForRecentTransactionFromWalletToWallet(testAddress, "0x4ada952e1ef7d734a88683d913c51deab1b3ee29");
    // console.log('recentTransactionFromWalletToWallet', recentTransactionFromWalletToWallet);
})()