import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { useWeb3Context } from "context/web3Context";
import { useQuery, UseQueryOptions } from "react-query";
import { parseCampaign } from "utils/utility";

export const useCampaigns = (
  options?: Omit<
    UseQueryOptions<Campaign[], unknown, Campaign[], "campaigns">,
    "queryKey" | "queryFn"
  >
) => {
  const { contract } = useWeb3Context();

  const fetchCampaigns = async () => {
    const campaigns: CampaignResponse[] = await contract!.call('getCampaigns');

    if (campaigns) {
      const parsedCampaigns: Campaign[] = campaigns.map((campaign, i: number) => parseCampaign(campaign, i));
      return parsedCampaigns;
    }
    return [];
  }

  return useQuery<Campaign[], unknown, Campaign[], "campaigns">(
    "campaigns",
    fetchCampaigns,
    { enabled: !!contract, ...options }
  );
};
