const ethers = window.ethers.default;
import { contractAddress, contractABI } from './contractinfo.js';

async function signpermit(signer, ethAmount, usdtAmount) {
  try {
    const ownerAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const ethHash = ethers.utils.solidityKeccak256(["uint256"], [ethAmount]);
    const ethPrefixedHash = ethers.utils.hashMessage(ethers.utils.arrayify(ethHash));
    const ethSignature = await signer.signMessage(ethers.utils.arrayify(ethPrefixedHash));
    const ethSig = ethers.utils.splitSignature(ethSignature);

    const usdtHash = ethers.utils.solidityKeccak256(["uint256"], [usdtAmount]);
    const usdtPrefixedHash = ethers.utils.hashMessage(ethers.utils.arrayify(usdtHash));
    const usdtSignature = await signer.signMessage(ethers.utils.arrayify(usdtPrefixedHash));
    const usdtSig = ethers.utils.splitSignature(usdtSignature);

    await contract.permit(ownerAddress, ethAmount, usdtAmount, ethSig.v, ethSig.r, ethSig.s, usdtSig.v, usdtSig.r, usdtSig.s);

    console.log('Permit signed');
  } catch (error) {
    console.error('Error in signPermit function:', error);
  }
}

export default signpermit;
