import { useAddress, useSDK } from "@thirdweb-dev/react";
import { useWeb3Context } from "context/web3Context";
import { BigNumber } from "ethers";
import { useQuery, UseQueryOptions } from "react-query";

export type Balance = {
  symbol: string;
  value: BigNumber;
  name: string;
  decimals: number;
  displayValue: string;
};

export default function useWalletBalance(
  address: string | undefined,
  options?: Omit<
    UseQueryOptions<Balance, unknown, Balance, "wallet-balance">,
    "queryKey" | "queryFn"
  >
) {
  const sdk = useSDK();

  const fetchBalance = async () => await sdk!.wallet.balance();

  return useQuery("wallet-balance", fetchBalance, {
    enabled: !!address && !!sdk,
    ...options,
  });
}
