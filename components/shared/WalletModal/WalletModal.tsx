import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  ButtonBase,
  IconButton,
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { useCoinbaseWallet, useMetamask, useWalletConnect } from "@thirdweb-dev/react";

const metamaskImg = '../../img/metamask.svg';
const coinbaseImg = '../../img/coinbase.svg';
const walletConnectImg = '../../img/walletConnect.svg';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
}

const WalletModal = ({ isOpen, handleClose }: Props) => {
  const metamask = useMetamask();
  const coinbase = useCoinbaseWallet();
  const walletConnect = useWalletConnect();

  const handleMetamask = () => {
    metamask();
    handleClose();
  };

  const handleWalletconnect = () => {
    walletConnect();
    handleClose();
  };

  const handleCoinbase = () => {
    coinbase();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} classes={{ paper: 'm-0 bg-themed-bg flex flex-col justify-center items-center' }}>
      <DialogContent className='w-[min(90vw,_500px)]'>
        <DialogContentText component='div' className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AccountBalanceWalletIcon color="primary" fontSize="medium" /> Connect to a wallet
          </div>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </DialogContentText>

        <Divider className="my-3 bg-primary" />

        <div className="flex flex-col gap-2">
          <ButtonBase focusRipple className="wallet-card" onClick={handleMetamask}>
            <span>MetaMask</span>
            <img src={metamaskImg} alt="metamask" className="w-[25px] h-[25px] object-contain" />
          </ButtonBase>

          <ButtonBase focusRipple className="wallet-card" onClick={handleWalletconnect}>
            <span>WalletConnect</span>
            <img src={walletConnectImg} alt="walletconnect" className="w-[25px] h-[25px] object-contain" />
          </ButtonBase>

          <ButtonBase focusRipple className="wallet-card" onClick={handleCoinbase}>
            <span>Coinbase Wallet</span>
            <img src={coinbaseImg} alt="coinbase" className="w-[25px] h-[25px] object-contain" />
          </ButtonBase>
        </div>
        
        <Divider className="my-3 bg-secondary" />

        <div className="flex items-center gap-2 text-xs">
          <InfoIcon color="secondary" fontSize="small" /> Choose GOERLI TESTNET for network
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default React.memo(WalletModal);
