import CampaignList from "@/components/features/campaigns/CampaignList";
import { Campaign } from "@/types/campaign";
import { useCampaigns } from "hooks/web3/useCampaigns";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NoCampaignsYet from "@/components/shared/NoCampaignsYet";

const Campaigns: NextPage = () => {
  const router = useRouter();
  const { search } = router.query;
  const { data } = useCampaigns({ select });
  // const data = [] as Campaign[];

  function select(data: Campaign[]) {
    let filtered = [] as Campaign[];
    if (search) {
      filtered = data.filter(campaign => {
        return campaign.title
          .toLowerCase()
          .includes((search as string)
          .toLowerCase())
        || campaign.owner
          .toLowerCase()
          .includes((search as string)
          .toLowerCase())
      });
      return filtered;
    }
    return data;
  }

  return (
    <>
      <h1 className='heading blur-in' >Campaigns</h1>
      {data ? <CampaignList campaigns={data} /> : null}
      {data && !data.length && !!search
        ? <div className="text-xl">No results found<span> for <strong>"{search as string}"</strong></span>.</div>
        : null}

      {data && !data.length && !search
        ? <NoCampaignsYet href="/create" title='Looks like there are no campaigns yet.' buttonText='Create the first campaign' />
        : null}
    </>
  );
};

export default Campaigns;
