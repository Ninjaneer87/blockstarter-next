import React, { useContext, createContext, useEffect } from "react";
import { useAddress, useContract, useNetwork } from '@thirdweb-dev/react';
import { ethers } from "ethers";
import { SmartContract } from "@thirdweb-dev/sdk";
import useWalletBalance, { Balance } from 'hooks/web3/useWalletBalance';

type Web3ContextType = {
  contract: SmartContract<ethers.BaseContract> | undefined;
  address: string | undefined;
  network: ReturnType<typeof useNetwork>[0]['data']['chain'];
  balance: Balance | undefined;
};

const Web3Context = createContext({});

type Props = {
  children: React.ReactNode;
};

export const Web3ContextProvider = ({ children }: Props) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();
  const network = useNetwork();
  const { data: balance } = useWalletBalance(address);

  const context: Web3ContextType = {
    address,
    contract,
    network: network[0]?.data?.chain,
    balance
  };

  return (
    <Web3Context.Provider value={context} >
      {children}
    </Web3Context.Provider>
  )
};

export const useWeb3Context = () => useContext(Web3Context) as Web3ContextType;