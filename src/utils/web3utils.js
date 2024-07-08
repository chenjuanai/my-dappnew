import { Web3Provider } from '@ethersproject/providers';

export const signMessage = async (provider, message) => {
  const signer = provider.getSigner();
  const signature = await signer.signMessage(message);
  return signature;
};
