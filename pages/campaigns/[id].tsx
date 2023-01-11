import CampaignCard from "@/components/shared/CampaignCard";
import { useCampaign } from "hooks/web3/useCampaign";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const CampaignDetails: NextPage = () => {
  const { query: { id } } = useRouter();
  const { data: campaign } = useCampaign(+id!, {
    onSuccess: (data) => console.log(data)
  });
  console.log(id);

  return (
    <>
      <h1>{campaign?.title}</h1>
    </>
  );
};

export default CampaignDetails;
