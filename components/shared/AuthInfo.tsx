import React from 'react';
import { Button } from '@mui/material';
import SensorsIcon from '@mui/icons-material/Sensors';
import NumbersIcon from '@mui/icons-material/Numbers';
import { formatAddress } from 'utils/utility';
import ConnectButton from '@/components/shared/ConnectButton';
import { useAddress, useNetwork } from '@thirdweb-dev/react';
import useWalletBalance from 'hooks/useWalletBalance';

const AuthInfo = () => {
  const address = useAddress();
  const balance = useWalletBalance();
  const network = useNetwork();
  const chainInfo = network[0]?.data?.chain;

  return (
    <div className='flex items-center gap-6 lg:gap-4 wrap max-lg:flex-col'>
      {balance && chainInfo && address
        ? <>
            <Button
                color='primary'
                className='icon-wrapper bg-glass px-4 blur-in max-lg:shadow-themed-shadow max-lg:w-full'
                startIcon={<SensorsIcon />}
            >
              {chainInfo.name} <span>&nbsp;- {Number(balance.displayValue).toFixed(4)} {balance.symbol}</span>
            </Button>

            <Button
              color='secondary'
              className='icon-wrapper bg-glass px-4 blur-in max-lg:shadow-themed-shadow max-lg:w-full'
              startIcon={<NumbersIcon />}
            >
              {formatAddress(address)}
            </Button>
          </> 
        : <ConnectButton />
      }
    </div>
  );
};

export default AuthInfo;