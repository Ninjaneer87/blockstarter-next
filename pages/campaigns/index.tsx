import CampaignList from "@/components/features/campaigns/CampaignList";
import { Campaign } from "@/types/campaign";
import { useCampaigns } from "hooks/web3/useCampaigns";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Campaigns: NextPage = () => {
  const router = useRouter();
  const { search } = router.query;
  const { data } = useCampaigns({ select });

  function select(data: Campaign[]) {
    let filtered = [] as Campaign[];
    if (search) {
      filtered = data.filter(campaign => campaign.title.toLowerCase().includes((search as string).toLowerCase()));
      return filtered;
    }
    return data;
  }

  return (
    <>
      <h1 className='heading blur-in' >Campaigns</h1>
      {data ? <CampaignList campaigns={data} /> : null}
      {data && !data.length ? <div className="text-xl">No results found{search ? <span> for <strong>"{search as string}"</strong></span> : ''}.</div> : null}
    </>
  );
};

export default Campaigns;
