import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export type RefundParams = { campaignId: number; amount: string };

export const useRefund = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, RefundParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const refund = async ({ campaignId, amount }: RefundParams) => {
    await contract?.call("requestRefund", campaignId, ethers.utils.parseEther(amount));
  };

  return useMutation(refund, options);
};
