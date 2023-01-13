import CampaignList from "@/components/features/campaigns/CampaignList";
import { useCampaigns } from "hooks/web3/useCampaigns";
import type { NextPage } from "next";

const Campaigns: NextPage = () => {
  const { data } = useCampaigns();

  return (
    <>
      <h1 className='heading blur-in' >Campaigns</h1>
      {data ? <CampaignList campaigns={data} /> : null}
    </>
  );
};

export default Campaigns;
