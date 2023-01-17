import StarterCard from '@/components/shared/StarterCard';
import React from 'react';
import DonationsList from './DonationsList';
import { Divider } from '@mui/material'

type Props = {
  owner: string;
  story: string;
  donators: string[];
  donations: string[];
  isExpired: boolean;
}

const CampaignInfo = ({ owner, story, donators, donations, isExpired }: Props) => {
  return (
    <div className='font-light'>
      <h3 className='uppercase mb-2 mt-0'>Starter</h3>
      <Divider className='mb-6 bg-themed-border dark:opacity-30 opacity-40' />
      <StarterCard owner={owner} />

      <h3 className='uppercase mb-2'>Story</h3>
      <Divider className='mb-6 bg-themed-border dark:opacity-30 opacity-40' />
      <div className='text-sm dark:opacity-70 whitespace-pre-wrap'>{story}</div>

      <h3 className='uppercase mb-2'>Top donators</h3>
      <Divider className='mb-6 bg-themed-border dark:opacity-30 opacity-40' />
      {donators.length
        ? <DonationsList donators={donators} donations={donations} />
        : <div className='text-sm dark:opacity-70 '>
            {isExpired ? 'No donations here.' : 'No donations yet. Be the first to donate'}
          </div>}
    </div>
  );
};

export default React.memo(CampaignInfo);