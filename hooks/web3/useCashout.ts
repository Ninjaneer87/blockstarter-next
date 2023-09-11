import { useWeb3Context } from "context/web3Context";
import { ethers } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export type CashoutParams = { campaignId: number; amount: string };

export const useCashout = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, CashoutParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useWeb3Context();

  const cashout = async ({ campaignId, amount }: CashoutParams) => {
    await contract?.call("cashout", [
      campaignId,
      ethers.utils.parseEther(amount),
    ]);
  };

  return useMutation(cashout, options);
};
