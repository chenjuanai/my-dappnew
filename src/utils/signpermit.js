
const { ethers } = require('ethers');
const { contractAddress, contractABI } = require('./contractInfo');

async function signPermit(signer, ethAmount, usdtAmount) {
  try {
    const ownerAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // 计算ETH操作的哈希
    const ethHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "string"],
      [ownerAddress, ethAmount, contractAddress, "ETH"]
    );

    const ethPrefixedHash = ethers.utils.hashMessage(ethers.utils.arrayify(ethHash));
    const ethSignature = await signer.signMessage(ethers.utils.arrayify(ethPrefixedHash));
    const ethSig = ethers.utils.splitSignature(ethSignature);

    // 计算USDT操作的哈希
    const usdtHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "string"],
      [ownerAddress, usdtAmount, contract.address, "USDT"]
    );

    const usdtPrefixedHash = ethers.utils.hashMessage(ethers.utils.arrayify(usdtHash));
    const usdtSignature = await signer.signMessage(ethers.utils.arrayify(usdtPrefixedHash));
    const usdtSig = ethers.utils.splitSignature(usdtSignature);

    // 调用签约permit方法, 需要将ETH和USDT分别调用
    await contract.permit(ownerAddress, ethAmount, usdtAmount, ethSig.v, ethSig.r, ethSig.s);
    console.log("Permit signed for ETH");

    await contract.permit(ownerAddress, ethAmount, usdtAmount, usdtSig.v, usdtSig.r, usdtSig.s);
    console.log("Permit signed for USDT");
  } catch (error) {
    console.error("Error in signPermit function: ", error);
  }
}

module.exports = signPermit;
