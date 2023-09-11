import { useWeb3Context } from "context/web3Context";
import { ethers } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export type RefundParams = { campaignId: number; amount: string };

export const useRefund = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, RefundParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useWeb3Context();

  const refund = async ({ campaignId, amount }: RefundParams) => {
    await contract?.call("refund", [
      campaignId,
      ethers.utils.parseEther(amount),
    ]);
  };

  return useMutation(refund, options);
};
