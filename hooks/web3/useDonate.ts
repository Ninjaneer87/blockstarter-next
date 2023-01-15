import { useWeb3Context } from "context/web3Context";
import { ethers } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export type DonationParams = { id: number; amount: string };

export const useDonate = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, DonationParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useWeb3Context();

  const donate = async ({ id, amount }: DonationParams) => {
    await contract?.call("donate", id, {
      value: ethers.utils.parseEther(amount),
    });
  };

  return useMutation(donate, options);
};
