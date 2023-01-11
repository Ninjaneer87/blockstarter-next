import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useQuery, UseQueryOptions } from "react-query";

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
      const parsedCampaigns: Campaign[] = campaigns.map((campaign, i: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber() * 1000, // block timestamps are in seconds
        ownerBalance: ethers.utils.formatEther(campaign.ownerBalance),
        sumOfAllDonations: ethers.utils.formatEther(campaign.sumOfAllDonations),
        image: campaign.image,
        donators: campaign.donators,
        donations: campaign.donations.map(d => ethers.utils.formatEther(d.toString())),
        pId: i,
      }));

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
