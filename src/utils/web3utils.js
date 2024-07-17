const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const { ethers } = window.ethers.default;

// 获取 Web3 提供者
export const getWeb3Provider = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: 'https://eth-mainnet.alchemyapi.io/v2/CJVGVw6fgmsFFHoKjCqgs6TduP4JFuC-' // Replace with your actual Alchemy API URL
        },
        bridge: 'https://bridge.walletconnect.org'
      }
    }
  };

  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions
  });

  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  return provider;
};

// 签名消息
export const signMessage = async (signer, message) => {
  const signature = await signer.signMessage(message);
  return signature;
};
