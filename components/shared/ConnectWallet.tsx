import { useThemeContext } from 'context/themeContext';
import React from 'react';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import ConnectButton from './ConnectButton';


const ConnectWallet = () => {
  const {dark} = useThemeContext();

  return (
    <section className={`${dark ? 'gradient-wrapper' : ''} mx-auto w-[500px] max-w-full blur-in`}>
      <div className='bg-themed-bg-paper rounded-2xl p-6 flex flex-col items-center gap-6'>
        <h2 className='m-0 text-center'>Connect your wallet to see your campaings</h2>
        <ElectricalServicesIcon fontSize='large' color='primary' className='w-[200px] h-[200px] border border-solid border-themed-border rounded-full p-4' />
        <ConnectButton className='w-full' />
      </div>
    </section>
  );
};

export default React.memo(ConnectWallet);