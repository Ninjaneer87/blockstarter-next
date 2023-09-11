import { CampaignBody } from "@/types/campaign-body";
import { useContractWrite } from "@thirdweb-dev/react";
import { useWeb3Context } from "context/web3Context";
import { ContractReceipt } from "ethers";
import { MutateOptions, useMutation } from "react-query";

type Options = MutateOptions<
  Omit<
    {
      receipt: ContractReceipt;
      data: () => Promise<unknown>;
    },
    "data"
  >,
  unknown,
  {
    args?: any[] | undefined;
    overrides?: any | undefined;
  },
  unknown
>;

export const useAddCampaign = (options?: Options) => {
  const { contract, address } = useWeb3Context();
  const { mutateAsync } = useContractWrite(contract, "createCampaign");

  const addCampaign = (campaignForm: CampaignBody) => {
    return mutateAsync(
      {
        args: [
          address,
          campaignForm.title,
          campaignForm.story,
          campaignForm.target,
          Math.round(new Date(campaignForm.deadline).getTime() / 1000), // block timestamps are in seconds
          campaignForm.image,
        ],
      },
      { ...options }
    );
  };

  return useMutation(addCampaign);
};
