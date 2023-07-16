import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { useWeb3Context } from "context/web3Context";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { parseCampaign } from "utils/utility";

export const useCampaign = (
  id: number,
  options?: Omit<
    UseQueryOptions<Campaign, unknown, Campaign, ["campaign", number]>,
    "queryKey" | "queryFn"
  >
) => {
  const { contract } = useWeb3Context();
  const queryClient = useQueryClient(); 

  const fetchCampaign = async () => {
    const campaign: CampaignResponse = await contract!.call("getCampaign", id);
    const parsedCampaign = parseCampaign(campaign, id);
    return parsedCampaign;
  }

  return useQuery<Campaign, unknown, Campaign, ["campaign", number]>(
    ["campaign", id],
    fetchCampaign,
    { 
      enabled: options?.enabled !== undefined ? options?.enabled && !!contract : !!contract,
      initialData: () => {
        const campaign = queryClient.getQueryData<Campaign[]>('campaigns')?.find(c => c.pId === id);
        return campaign;
      },
      ...options, 
    }
  );
};
