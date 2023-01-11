import { ethers } from "ethers";

export type CampaignBody = {
  fullname: string;
  title: string;
  target: ethers.BigNumber;
  deadline: string;
  story: string;
  image: string;
}