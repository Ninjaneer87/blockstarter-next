import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite, useCoinbaseWallet, useWalletConnect, useNetwork } from '@thirdweb-dev/react';
import { ethers } from "ethers";
import { SmartContract } from "@thirdweb-dev/sdk";
import { CampaignResponse } from "@/types/campaign-response";
import { Campaign } from "@/types/campaign";
import { Donation } from "@/types/donation";
import { CampaignBody } from "@/types/campaign-body";
import useWalletBalance, { Balance } from "hooks/web3/useWalletBalance";
import { useEffect } from "react";

type Web3ContextType = {
  address: string | undefined;
  contract: SmartContract<ethers.BaseContract> | undefined;
  createCampaign: (form: CampaignBody) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (pId: number, amount: string) => Promise<any>;
  getDonations: (pid: number) => Promise<Donation[]>;
};

const Web3Context = createContext({});

type Props = {
  children: React.ReactNode;
};

export const Web3ContextProvider = ({ children }: Props) => {
  const { contract } = useContract(process.env.CONTRACT_ADDRESS);
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const address = useAddress();

  const publishCampaign = async (form: CampaignBody) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.story,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log('Contract call success', data);
    } catch (error) {
      console.log('Contract call failed', error);
    }
  }

  const getCampaigns = async () => {
    const campaigns: CampaignResponse[] = await contract?.call('getCampaigns');

    const parsedCampaigns: Campaign[] = campaigns.map((campaign, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline,
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      sumOfAllDonations: ethers.utils.formatEther(campaign.sumOfAllDonations.toString()),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(c => c.owner === address)
    return filteredCampaigns;
  }

  const donate = async (pId: number, amount: string) => {
    const data = await contract?.call('donateToCampaign', pId, {
      value: ethers.utils.parseEther(amount)
    });
    return data;
  }

  const getDonations = async (pid: number): Promise<Donation[]> => {
    const donations = await contract?.call('getDonators', pid);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      });
    }

    return parsedDonations;
  }

  const context: Web3ContextType = {
    address,
    contract,
    createCampaign: publishCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getDonations,
  };

  return (
    <Web3Context.Provider value={context} >
      {children}
    </Web3Context.Provider>
  )
};

export const useWeb3Context = () => useContext(Web3Context) as Web3ContextType;