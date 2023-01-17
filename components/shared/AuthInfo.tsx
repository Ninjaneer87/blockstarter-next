import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import SensorsIcon from '@mui/icons-material/Sensors';
import { formatAddress } from 'utils/utility';
import ConnectButton from '@/components/shared/ConnectButton';
import { useWeb3Context } from 'context/web3Context';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const AuthInfo = () => {
  const { address, network, balance } = useWeb3Context();
  const [copied, setCopied] = useState(false);

  const copyHandler = async () => {
    if (copied) return;
    if (!navigator.clipboard || !address) return;

    await navigator.clipboard.writeText(address);
    setCopied(true);

    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className='flex items-center gap-6 lg:gap-4 wrap max-lg:flex-col'>
      {balance && network && address
        ? <>
          <Tooltip title='Get me some GOR' arrow>
            <Button
              href="https://goerlifaucet.com/"
              target='_blank'
              LinkComponent='a'
              color='primary'
              className='icon-wrapper bg-glass px-4 blur-in max-lg:shadow-themed-shadow max-lg:w-full'
            >
              <SensorsIcon fontSize='small' className='mr-2' /> {network.name} <span>&nbsp;- {Number(balance.displayValue).toFixed(4)} {balance.symbol}</span>
            </Button>
          </Tooltip>

          <Tooltip title={copied ? 'Copied' : 'Copy address'} arrow >
            <Button
              color='secondary'
              className='icon-wrapper bg-glass px-4 blur-in max-lg:shadow-themed-shadow max-lg:w-full min-w-[180px]'
              onClick={copyHandler}
            >
              <ContentCopyIcon fontSize='small' className='mr-2' />{copied ? 'Copied!' : formatAddress(address)}
            </Button>
          </Tooltip>
        </>
        : <ConnectButton />
      }
    </div>
  );
};

export default React.memo(AuthInfo);