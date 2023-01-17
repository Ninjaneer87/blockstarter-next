import CampaignList from '@/components/features/campaigns/CampaignList';
import ConnectWallet from '@/components/shared/ConnectWallet';
import NoCampaignsYet from '@/components/shared/NoCampaignsYet';
import { Campaign } from '@/types/campaign';
import { useWeb3Context } from 'context/web3Context';
import { useCampaigns } from 'hooks/web3/useCampaigns';
import { NextPage } from 'next';
import React from 'react';

const Donated: NextPage = () => {
  const { address } = useWeb3Context();
  const { data } = useCampaigns({ select, enabled: !!address });

  function select(data: Campaign[]) {
    return data.filter(d => d.donators?.includes(address!))
  }

  return (
    <>
      <h1 className='heading blur-in' >Supported campaigns</h1>
      {data ? <CampaignList campaigns={data} /> : null}
      {data && !data.length && address
        ? <NoCampaignsYet href='/campaigns' title='Looks like you have not donated to any campaign yet.' buttonText='Go see some campaigns' />
        : null}
      {!address ? <ConnectWallet title='Connect your wallet to see where you have donated' /> : null}

    </>
  );
};

export default Donated;