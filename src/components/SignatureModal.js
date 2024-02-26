import React from 'react';
import { signMessage } from '../utils/web3Utils';

function SignatureModal({ provider }) {
  const handleSign = async () => {
    const message = "Hello, world!";
    const signature = await signMessage(provider, message);
    // 处理签名结果，例如显示签名或发送到服务器
  };

  return (
    <div>
      <p>Signature Request</p>
      <button onClick={handleSign}>Confirm Signature</button>
    </div>
  );
}

export default SignatureModal;
