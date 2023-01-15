import WalletModal from '@/components/shared/WalletModal/WalletModal';
import { ButtonBase, Container } from '@mui/material';
import { NextPage } from 'next';
import React, { useState } from 'react';

const Manual: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <h1 className='heading blur-in' >BlockStarter Manual</h1>

      <Container maxWidth='md' className='leading-7 text-sm font-light blur-in'>
        <h2>Step 1.</h2>
        <div>
          In order to make the most out of this application, make sure you have a browser wallet installed (Metamask recommended).
          <br />
          If you don't have a wallet yet, click on <ButtonBase focusRipple onClick={handleOpenModal} className='text-secondary px-1' >CONNECT WALLET</ButtonBase> button and pick one.
          <br />
          Then follow the steps to set up the wallet and your first address/account.
        </div>

        <h2 className='mt-10'>Step 2.</h2>
        <div>
          After successfull instalation, pick "GOERLI TESTNET" for the network in the wallet interface. While there, click to copy your address.
        </div>

        <h2 className='mt-10'>Step 3.</h2>
        <div>
          Go to <a href='https://goerlifaucet.com/' className='text-secondary' target='_blank'>GOERLI FAUCET↗</a>, paste your address in the input field and send your self some testnet GOR (native token of the Goerli testnet).
        </div>

        <h2 className='mt-10'>Step 4.</h2>
        <div>
          Go to <ButtonBase focusRipple onClick={handleOpenModal} className='text-secondary px-1' >CONNECT WALLET</ButtonBase> again and choose your installed wallet, follow the steps to sign in (if not already).
          <br />
          Now you are connected and ready to create your own campaigns or donate to a campaign.
        </div>
      </Container>
      <WalletModal isOpen={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Manual;