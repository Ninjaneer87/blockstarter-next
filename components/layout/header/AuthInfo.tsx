import React from 'react';
import { Button } from '@mui/material';
import { useWeb3Context } from 'context/web3Context';
import SensorsIcon from '@mui/icons-material/Sensors';
import PowerIcon from '@mui/icons-material/Power';
import { formatAddress } from 'utils/utility';
import ConnectButton from '@/components/shared/ConnectButton';

const AuthInfo = () => {
  const { balance, address, network } = useWeb3Context();


  return (
    <>
      <div className='flex items-center gap-6 lg:gap-4 wrap max-lg:flex-col'>
        {balance && network && address
          ? <>
              <Button
                  color='primary'
                  className='icon-wrapper bg-glass px-4 blur-in max-lg:shadow-themed-shadow max-lg:w-full'
                  startIcon={<SensorsIcon />}
              >
                {network.name} <span>&nbsp;- {Number(balance.displayValue).toFixed(4)} {balance.symbol}</span>
              </Button>

              <Button
                color='secondary'
                className='icon-wrapper bg-glass px-4 blur-in max-lg:shadow-themed-shadow max-lg:w-full'
                startIcon={<PowerIcon />}
              >
                {formatAddress(address)}
              </Button>
            </> 
          : <ConnectButton />
        }
      </div>
    </>
  );
};

export default AuthInfo;