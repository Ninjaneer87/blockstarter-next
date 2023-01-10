export type CampaignResponse = {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: number;
  amountCollected: number;
  sumOfAllDonations: number;
  image: string;
  donators: string[];
  donations: number[];
}