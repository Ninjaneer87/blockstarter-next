import { CampaignBody } from "@/types/campaign-body";
import { useContractWrite } from "@thirdweb-dev/react";
import { useWeb3Context } from "context/web3Context";
import { ContractReceipt } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export const useAddCampaign = (
  options?: Omit<
    UseMutationOptions<ContractReceipt, unknown, CampaignBody, unknown>,
    "mutationFn"
  >
) => {
  const { contract, address } = useWeb3Context();
  const { mutateAsync } = useContractWrite(contract, "createCampaign");

  const addCampaign = (campaignForm: CampaignBody) => {
    return mutateAsync([
      address,
      campaignForm.title,
      campaignForm.story,
      campaignForm.target,
      Math.round(new Date(campaignForm.deadline).getTime() / 1000), // block timestamps are in seconds
      campaignForm.image,
    ]);
  };

  return useMutation(addCampaign, options);
};
