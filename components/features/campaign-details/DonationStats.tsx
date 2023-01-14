import React from 'react';

type Props = {
  daysLeft: string;
  amountRaised: string;
  target: string;
  isExpired: boolean;
  backersCount?: number;
}

const DonationStats = ({ daysLeft, amountRaised, target, isExpired, backersCount = 0 }: Props) => {
  const statItems = [
    { id: 1, value: amountRaised > target ? 'Indefinite' : daysLeft, label: 'Days left' },
    { id: 2, value: amountRaised, label: `ETH raised of ${target}` },
    { id: 3, value: backersCount, label: 'Total backers' },
  ];

  return (
    <ul className='flex flex-wrap gap-8'>
      {statItems.map(({ id, value, label }) => (
        <li key={id} className='w-full text-center overflow-hidden rounded-2xl flex flex-col'>
          <div className='text-2xl font-bold p-4 bg-themed-bg-paper grow flex justify-center items-center'>
            <span className='truncate max-w-[250px]'>{value}</span>
          </div>
          <div className={`opacity-90 p-4 ${isExpired ? 'bg-red-400' : 'bg-primary'} mt-auto flex justify-center items-center`}>
            <span className='truncate max-w-[250px]'>{label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(DonationStats);