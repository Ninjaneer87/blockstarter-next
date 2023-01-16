import CampaignList from '@/components/features/campaigns/CampaignList';
import ConnectWallet from '@/components/shared/ConnectWallet';
import NoCampaignsYet from '@/components/shared/NoCampaignsYet';
import { Campaign } from '@/types/campaign';
import { useWeb3Context } from 'context/web3Context';
import { useCampaigns } from 'hooks/web3/useCampaigns';
import { NextPage } from 'next';
import React from 'react';

const Profile: NextPage = () => {
  const { address } = useWeb3Context();
  const { data } = useCampaigns({ select });

  function select(data: Campaign[]) {
    return data.filter(d => d.owner === address)
  }

  return (
    <>
      <h1 className='heading blur-in' >My campaigns</h1>
      {data ? <CampaignList campaigns={data} /> : null}
      {data && !data.length && address
        ? <NoCampaignsYet title='Looks like you have not started any campaign yet.' buttonText='Start my first campaign' />
        : null}
      {!address ? <ConnectWallet /> : null}

    </>
  );
};

export default Profile;