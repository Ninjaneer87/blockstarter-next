import { Campaign } from '@/types/campaign';
import React from 'react';
import CampaignCard from './CampaignCard';

type Props = {campaigns: Campaign[]}
const CampaignList = ({campaigns}: Props) => {
  return (
    <section className='mx-auto blur-in'>
      <ul className='grid grid-cols-[repeat(auto-fit,_minmax(280px,_320px))] justify-center gap-10'>
        {campaigns.map((campaign, i) => (
          <li key={campaign.pId} >
            <CampaignCard campaign={campaign} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CampaignList;