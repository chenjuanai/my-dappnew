import Web3Modal from '@web3modal/wallet';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: `https://eth-mainnet.alchemyapi.io/v2/CJVGVw6fgmsFFHoKjCqgs6TduP4JFuC-
        `, // 替换为你的 Alchemy API key
      },
      chainId: 1
    }
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export const connectWallet = async () => {
  const provider = await web3Modal.connect();
  const ethersProvider = new providers.Web3Provider(provider);
  return ethersProvider;
};
