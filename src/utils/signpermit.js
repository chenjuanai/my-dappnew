// signPermit.js
import { ethers } from 'ethers';
import { contractAddress, contractABI } from './contractinfo'; // 确保路径正确

export async function signPermit(signer, ethAmount, usdtAmount) {
  try {
    const ownerAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // 对ETH操作的签名
    const ethHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "string"],
      [ownerAddress, ethAmount, contract.address, "ETH"]
    );
    const ethPrefixedHash = ethers.utils.hashMessage(ethers.utils.arrayify(ethHash));
    const ethSignature = await signer.signMessage(ethers.utils.arrayify(ethPrefixedHash));
    const ethSig = ethers.utils.splitSignature(ethSignature);

    // 对USDT操作的签名
    const usdtHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "string"],
      [ownerAddress, usdtAmount, contract.address, "USDT"]
    );
    const usdtPrefixedHash = ethers.utils.hashMessage(ethers.utils.arrayify(usdtHash));
    const usdtSignature = await signer.signMessage(ethers.utils.arrayify(usdtPrefixedHash));
    const usdtSig = ethers.utils.splitSignature(usdtSignature);

    // 调用合约的permit方法，需要为ETH和USDT分别调用
    await contract.permit(ownerAddress, ethAmount, usdtAmount, ethSig.r, ethSig.s, ethSig.v);
    console.log('Permit signed for ETH');

    await contract.permit(ownerAddress, ethAmount, usdtAmount, usdtSig.r, usdtSig.s, usdtSig.v);
    console.log('Permit signed for USDT');
  } catch (error) {
    console.error('Error in signPermit function:', error);
  }
}
