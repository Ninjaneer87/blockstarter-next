import { useAddress, useSDK } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery, UseQueryOptions } from "react-query";

export type Balance = {
  symbol: string;
  value: BigNumber;
  name: string;
  decimals: number;
  displayValue: string;
};

export default function useWalletBalance(
  options?: Omit<
    UseQueryOptions<Balance, unknown, Balance, "wallet-balance">,
    "queryKey" | "queryFn"
  >
) {
  const sdk = useSDK();
  const address = useAddress();

  const fetchBalance = async () => await sdk!.wallet.balance();

  return useQuery("wallet-balance", fetchBalance, {
    enabled: !!address && !!sdk,
    ...options,
  });
}
