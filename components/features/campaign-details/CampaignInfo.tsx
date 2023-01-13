import StarterCard from '@/components/shared/StarterCard';
import React from 'react';
import DonationsList from './DonationsList';

type Props = {
  owner: string;
  story: string;
  donators: string[];
  donations: string[];
}

const CampaignInfo = ({ owner, story, donators, donations} : Props) => {
  return (
    <div className='font-light'>
      <h3 className='uppercase mb-2 mt-0'>Starter</h3>
      <StarterCard owner={owner} />
      
      <h3 className='uppercase mb-2'>Story</h3>
      <div className='text-sm dark:opacity-70 whitespace-pre-wrap'>{story}</div>
      
      <h3 className='uppercase mb-2'>Top donators</h3>
      {donators.length 
        ? <DonationsList donators={donators} donations={donations} />
        : <div className='text-sm dark:opacity-70 '>No donations yet. Be the first to donate</div> }
    </div>
  );
};

export default React.memo(CampaignInfo);