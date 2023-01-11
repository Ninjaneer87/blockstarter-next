import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";

export const useCampaign = (
  id: number,
  options?: Omit<
    UseQueryOptions<Campaign, unknown, Campaign, ["campaign", number]>,
    "queryKey" | "queryFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const queryClient = useQueryClient(); 

  const fetchCampaign = async () => {
    const campaign: CampaignResponse = await contract!.call("getProject", id);

    const parsedCampaign: Campaign = {
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber() * 1000, // block timestamps are in seconds
      ownerBalance: ethers.utils.formatEther(campaign.ownerBalance),
      sumOfAllDonations: ethers.utils.formatEther(campaign.sumOfAllDonations),
      image: campaign.image,
      donators: campaign.donators,
      donations: campaign.donations.map((d) => ethers.utils.formatEther(d.toString())),
      pId: id,
    };

    return parsedCampaign;
  }

  return useQuery<Campaign, unknown, Campaign, ["campaign", number]>(
    ["campaign", id],
    fetchCampaign,
    { 
      enabled: !!contract && id !== undefined,
      initialData: () => {
        const campaign = queryClient.getQueryData<Campaign[]>('campaigns')?.find(c => c.pId === id);
        return campaign;
      },
      ...options, 
    }
  );
};
