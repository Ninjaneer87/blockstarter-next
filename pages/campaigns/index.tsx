import CampaignCard from "@/components/shared/CampaignCard";
import { useCampaigns } from "hooks/web3/useCampaigns";
import type { NextPage } from "next";
import Link from "next/link";

const Campaigns: NextPage = () => {
  const { data } = useCampaigns({
    onSuccess: (data) => console.log(data)
  });

  return (
    <>
      <h1>Campaigns</h1>
      <CampaignCard />
      <Link href='/campaigns/0'>GO TO CAMPAIGN 0</Link>
    </>
  );
};

export default Campaigns;
