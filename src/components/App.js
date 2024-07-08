import React, { useState } from 'react';
import Web3Modal from '../utis/web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import WalletConnectButton from './WalletConnectButton';
import SignatureModal from './SignatureModal';
import './App.css';

const App = () => {
  const [signer, setSigner] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signature, setSignature] = useState(null);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: 'YOUR_INFURA_PROJECT_ID' // 替换为实际的Infura项目ID
            }
          }
        }
      });

      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
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
      const signature = await signer.signMessage(message);
      setSignature(signature);
      console.log('Signature:', signature);
      // 提交签名到区块链或进一步处理
      await submitSignatureToBlockchain(signature);
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
