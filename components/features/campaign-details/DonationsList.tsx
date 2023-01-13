import React, { useMemo } from 'react';

type Props = {
  donators: string[];
  donations: string[];
};

type TransformedDonation = { [key: string]: number };
const DonationsList = ({ donators, donations }: Props) => {
  const sortedDonations = useMemo(() => {
    const transformedDonations = donators.reduce((acc, item, i) => {
      const donation = +donations[i];
      let transformedAcc = { ...acc };
      if (transformedAcc[item]) {
        transformedAcc[item] += donation;
        return transformedAcc;
      }
      transformedAcc[item] = donation;

      return transformedAcc;
    }, {} as TransformedDonation);
    
    const sorted = Object.entries(transformedDonations).sort((a, b) => b[1] - a[1]).slice(0, 10);
    return sorted;
  }, [donators]);


  return (
    <ul>
      {sortedDonations.map(([sender, value], i) => (
        <li key={i} className='grid grid-cols-[2fr,_1fr] w-full gap-4 pb-5 text-sm'>
          <div title={sender} className='opacity-80 truncate'>{i + 1}. {sender}</div>
          <div title={`${value}`} className='text-right truncate font-medium'>{value}</div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(DonationsList);