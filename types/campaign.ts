export type Campaign = {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  sumOfAllDonations: string;
  image: string;
  donators?: string[];
  donations?: string[];
}