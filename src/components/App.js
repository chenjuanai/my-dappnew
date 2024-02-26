import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectButton from './components/WalletConnectButton'; // 确保路径正确
import SignatureModal from './components/SignatureModal'; // 确保路径正确
import './App.css'; // 假设你有一个App.css文件来添加样式

function App() {
  const [signer, setSigner] = useState(null); // 用于存储 signer 对象
  const [showSignatureModal, setShowSignatureModal] = useState(false); // 控制签名模态框的显示

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      setSigner(signer); // 将 signer 对象保存到状态中
      setShowSignatureModal(true); // 连接成功后显示签名模态框
      console.log("Wallet connected!");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div className="App">
      <div className="background-dollar"> {/* 美元背景样式 */}</div>
      {!signer && <WalletConnectButton onConnect={connectWallet} />}
      {showSignatureModal && <SignatureModal signer={signer} onClose={() => setShowSignatureModal(false)} />}
    </div>
  );
}

export default App;
