export type Campaign = {
  pId: number;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  ownerBalance: string;
  sumOfAllDonations: string;
  image: string;
  donators?: string[];
  donations?: string[];
  isExpired: boolean;
  amountProgress: number;
}