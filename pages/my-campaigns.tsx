import CampaignList from '@/components/features/campaigns/CampaignList';
import ConnectWallet from '@/components/shared/ConnectWallet';
import { useAddress } from '@thirdweb-dev/react';
import { useCampaigns } from 'hooks/web3/useCampaigns';
import { NextPage } from 'next';
import React from 'react';

const Profile: NextPage = () => {
  const address = useAddress();
  const { data } = useCampaigns({
    select: data => data.filter(d => d.owner === address),
  });

  return (
    <>
      <h1 className='heading blur-in' >My campaigns</h1>
      {data ? <CampaignList campaigns={data} /> : null}
      {!address ? <ConnectWallet /> : null}
    </>
  );
};

export default Profile;