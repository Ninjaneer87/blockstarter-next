import { ethers } from "ethers";

export type CampaignBody = {
  title: string;
  target: ethers.BigNumber;
  deadline: string;
  story: string;
  image: string;
}