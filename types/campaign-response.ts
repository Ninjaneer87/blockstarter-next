import { BigNumber } from "ethers";

export type CampaignResponse = {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: BigNumber;
  ownerBalance: number;
  sumOfAllDonations: number;
  image: string;
  donators: string[];
  donations: number[];
}