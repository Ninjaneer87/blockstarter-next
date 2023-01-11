import { useContract } from "@thirdweb-dev/react";
import { useMutation, UseMutationOptions } from "react-query";

export type WithdrawParams = { id: number; amount: string };

export const useWithdraw = (
  options?: Omit<
    UseMutationOptions<unknown, unknown, WithdrawParams, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const withdraw = async ({ id, amount }: WithdrawParams) => {
    await contract?.call("ownerWithdrawal", id, amount);
  };

  return useMutation(withdraw, options);
};
