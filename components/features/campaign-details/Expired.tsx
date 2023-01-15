import ConnectButton from '@/components/shared/ConnectButton';
import { useWeb3Context } from 'context/web3Context';
import React from 'react';

type Props = { amount: number }

const Expired = ({ amount }: Props) => {
  const { address } = useWeb3Context();

  return (
    <>
      <div className='blur-in flex flex-col gap-4 p-4 sm:gap-8 sm:p-8 rounded-2xl bg-themed-bg-paper h-fit'>
        <h3 className='text-center m-0'>This campaign has expired</h3>

        <div className='p-4 text-sm rounded-lg bg-themed-bg'>
          <div className='font-bold'>Please check our other campaigns for opportunities to support and help kickstart innovative projects.</div>

          <small className='mt-3 flex shrink-0 items-start text-secondary'>Good luck!</small>
        </div>
        {!address && amount
          ? <>
            <div className='text-sm rounded-lg'>
              <div className='opacity-80 font-normal'>Connect your wallet to check for a possible refund</div>
            </div>

            <ConnectButton />
          </>
          : null}
      </div>
    </>
  );
};

export default Expired;
