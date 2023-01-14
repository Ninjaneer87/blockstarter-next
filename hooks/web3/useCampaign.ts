import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { useContract } from "@thirdweb-dev/react";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { parseCampaign } from "utils/utility";

export const useCampaign = (
  id: string,
  options?: Omit<
    UseQueryOptions<Campaign, unknown, Campaign, ["campaign", string]>,
    "queryKey" | "queryFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const queryClient = useQueryClient(); 

  const fetchCampaign = async () => {
    const campaign: CampaignResponse = await contract!.call("getProject", id);
    const parsedCampaign = parseCampaign(campaign, +id);
    return parsedCampaign;
  }

  return useQuery<Campaign, unknown, Campaign, ["campaign", string]>(
    ["campaign", id],
    fetchCampaign,
    { 
      enabled: !!contract && !!id,
      initialData: () => {
        const campaign = queryClient.getQueryData<Campaign[]>('campaigns')?.find(c => c.pId === +id);
        return campaign;
      },
      ...options, 
    }
  );
};
