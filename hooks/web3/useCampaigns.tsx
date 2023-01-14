import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { useContract } from "@thirdweb-dev/react";
import { useQuery, UseQueryOptions } from "react-query";
import { parseCampaign } from "utils/utility";

export const useCampaigns = (
  options?: Omit<
    UseQueryOptions<Campaign[], unknown, Campaign[], "campaigns">,
    "queryKey" | "queryFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const fetchCampaigns = async () => {
    const campaigns: CampaignResponse[] = await contract!.call('getProjects');

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
