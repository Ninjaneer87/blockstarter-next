import React, { useState } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { ButtonBase } from '@mui/material';
import WalletModal from '@/components/shared/WalletModal/WalletModal';

const ConnectButton = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <ButtonBase
        focusRipple
        className='gradient-button blur-in'
        onClick={handleOpenModal}
      >
        <AccountBalanceWalletIcon /> Connect wallet
      </ButtonBase>
      <WalletModal isOpen={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default ConnectButton;