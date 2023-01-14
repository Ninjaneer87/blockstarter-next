import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export type CashoutParams = { campaignId: number; amount: string };

export const useCashout = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, CashoutParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const cashout = async ({ campaignId, amount }: CashoutParams) => {
    await contract?.call("ownerWithdrawal", campaignId, ethers.utils.parseEther(amount));
  };

  return useMutation(cashout, options);
};
