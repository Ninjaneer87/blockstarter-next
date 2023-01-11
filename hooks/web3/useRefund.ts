import { useContract } from "@thirdweb-dev/react";
import { useMutation, UseMutationOptions } from "react-query";

export type RefundParams = { id: number; amount: string };

export const useRefund = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, RefundParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const refund = async ({ id, amount }: RefundParams) => {
    await contract?.call("requestRefund", id, amount);
  };

  return useMutation(refund, options);
};
