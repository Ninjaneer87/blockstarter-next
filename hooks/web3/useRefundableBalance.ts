import { useWeb3Context } from "context/web3Context";
import { ethers } from "ethers";
import { useQuery, UseQueryOptions } from "react-query";

export const useRefundableBalance = (
  id: number,
  options?: Omit<
    UseQueryOptions<string, unknown, string, ["refundable-balance", number]>,
    "queryKey" | "queryFn"
  >
) => {
  const { contract, address } = useWeb3Context();

  const fetchRefundableBalance = async () => {
    const balance: number = await contract!.call("getRefundableBalance", [
      address,
      id,
    ]);
    const parsedBalance = ethers.utils.formatEther(balance);
    return parsedBalance;
  };

  return useQuery<string, unknown, string, ["refundable-balance", number]>(
    ["refundable-balance", id],
    fetchRefundableBalance,
    {
      ...options,
      enabled: !!address && !!contract && !isNaN(id),
    }
  );
};
