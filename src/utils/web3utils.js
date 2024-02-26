import Web3Modal from "web3modal";
import Web3 from "web3";

let web3Modal;
let provider;
let web3;

const providerOptions = {
  /* 配置提供者选项，如WalletConnect等 */
};

// 初始化Web3Modal
const initWeb3Modal = () => {
  web3Modal = new Web3Modal({
    network: "mainnet", // 可以根据需要配置为其他网络
    cacheProvider: true, // 启用缓存选择器以便在页面重新加载时自动连接
    providerOptions // 传入提供者选项
  });
};

// 连接钱包
export const connectWallet = async () => {
  initWeb3Modal();
  provider = await web3Modal.connect();
  web3 = new Web3(provider);

  // 监听账户和链的变化
  provider.on("accountsChanged", (accounts) => {
    console.log("Accounts changed:", accounts);
    // 可以在这里处理账户变化逻辑
  });

  provider.on("chainChanged", (chainId) => {
    console.log("Chain changed:", chainId);
    // 可以在这里处理链变化逻辑
  });

  provider.on("disconnect", (error) => {
    console.log("Provider disconnected:", error);
    // 可以在这里处理断开连接逻辑
  });

  return web3;
};
