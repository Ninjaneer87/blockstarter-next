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
  const { mutateAsync: createCampaign } = useContractWrite(contract, "createProject");
  const address = useAddress();

  return useMutation((campaignForm: CampaignBody) => {
    return createCampaign([
      address,
      campaignForm.title,
      campaignForm.story,
      campaignForm.target,
      Math.round(new Date(campaignForm.deadline).getTime() / 1000), // in seconds
      campaignForm.image,
    ]);
  }, options || {});
};
