import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { parseCampaign } from "utils/utility";

export const useRefundableBalance = (
  id: string,
  options?: Omit<
    UseQueryOptions<string, unknown, string, ["refundable-balance", string]>,
    "queryKey" | "queryFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();

  const fetchRefundableBalance = async () => {
    const balance: number = await contract!.call("getRefundableBalance", id);
    const parsedBalance = ethers.utils.formatEther(balance);
    return parsedBalance;
  }

  return useQuery<string, unknown, string, ["refundable-balance", string]>(
    ["refundable-balance", id],
    fetchRefundableBalance,
    {
      ...options,
      enabled: !!address && !!contract
    }
  );
};
