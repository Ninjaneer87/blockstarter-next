import React from 'react';

type Props = {
  donators: string[];
  donations: string[];
};

const DonationsList = ({ donators, donations }: Props) => {
  return (
    <ul>
      {donations.map((donation, i) => (
        <li key={i} className='grid grid-cols-[2fr,_1fr] w-full gap-4 pb-5 text-sm'>
          <div title={donators[i]} className='opacity-80 truncate'>{i + 1}. {donators[i]}</div>
          <div title={donation} className='text-right truncate font-medium'>{donation}</div>
        </li>
      ))}
    </ul>
  );
};

export default DonationsList;