import { CampaignBody } from "@/types/campaign-body";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ContractReceipt } from "ethers";
import { useMutation, UseMutationOptions } from "react-query";

export const useAddCampaign = (
  options?: Omit<
    UseMutationOptions<ContractReceipt, unknown, CampaignBody, unknown>,
    "mutationFn"
  >
) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { mutateAsync } = useContractWrite(contract, "createProject");
  const address = useAddress();

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
