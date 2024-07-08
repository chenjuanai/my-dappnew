import React from 'react';

const WalletConnectButton = ({ onConnect }) => {
  return <button className="WalletConnectButton" onClick={onConnect}>Connect Wallet</button>;
};

export default WalletConnectButton;
