import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export type DonationParams = { id: number; amount: string };

export const useDonate = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, DonationParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const donate = async ({ id, amount }: DonationParams) => {
    await contract?.call("donateToProject", id, {
      value: ethers.utils.parseEther(amount),
    });
  };

  return useMutation(donate, options);
};
