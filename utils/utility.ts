import { Campaign } from "@/types/campaign";
import { CampaignResponse } from "@/types/campaign-response";
import { ethers } from "ethers";

export function formatAddress(address: string) {
  const addressArray = address.split("");
  const firstPart = addressArray.slice(0, 4);
  const midPart = ['.', '.', '.']
  const lastPart = addressArray.slice(-4);

  const shortAddress = [...firstPart, ...midPart, ...lastPart].join("");

  return shortAddress;
}

export const isActive = (linkPath: string, currentUrl: string, exact?: boolean): boolean => {
  const isExact = currentUrl === linkPath;
  const startsWith = (currentUrl.startsWith(linkPath) && linkPath.length > 1);

  return exact ? isExact : startsWith;
}

export const daysLeft = (deadline: number) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  let result = remainingDays.toFixed(0);
  if(remainingDays < 1) {
    result = 'Last day';
  }
  if(remainingDays < 0) {
    result = 'Expired';
  }

  return result;
};

export const calculateProgress = (goal: number, raisedAmount: number) => {
  const percentage = Math.min(Math.round((raisedAmount * 100) / goal), 100);

  return percentage;
};

export const isCampaignExpired = (deadline: number, goal: number, raisedAmount: number) => {
  const passedTheDeadline = daysLeft(deadline) === 'Expired';
  const targetReached = calculateProgress(goal, raisedAmount) === 100;

  return passedTheDeadline && !targetReached;
};

export const checkIfImage = (url: string, callback: (exists: boolean) => void) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const floatInputHandler = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
  let value = e.currentTarget.value;
    // remove any leading zeroes before the integer part
    if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        value = value.replace(/^0+(?=[1-9]|\.|$)/g, '');
    }
    // allow for only one dot
    const dotIndex = value.indexOf(".");
    if (dotIndex !== -1) {
        value = value.replace(/\./g, (char, i) => (i === dotIndex) ? char : "");
    }
    value = value.replace(/[^0-9.]/g, '');
    // check if valid float
    const isValidFloat = !isNaN(+value) && isFinite(+value);
    e.currentTarget.value = isValidFloat ? value : "";
}

export const floatPasteHandler = (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const pastedValue = e.clipboardData.getData("text");
  if(isNaN(+pastedValue)) {
    e.preventDefault();
  } 
}

export const parseCampaign = (campaign: CampaignResponse, pId: number): Campaign => {
  const { owner, title, description, image, donators } = campaign;

  const target = ethers.utils.formatEther(campaign.target.toString());
  const deadline = campaign.deadline.toNumber() * 1000 // block timestamps are in seconds
  const ownerBalance = ethers.utils.formatEther(campaign.ownerBalance);
  const sumOfAllDonations = ethers.utils.formatEther(campaign.sumOfAllDonations);
  const donations = campaign.donations.map((d) => ethers.utils.formatEther(d.toString()));
  const isExpired =  isCampaignExpired(deadline, +target, +sumOfAllDonations);
  const amountProgress = calculateProgress(+target, +sumOfAllDonations);

  const parsedCampaign: Campaign = {
    pId,
    owner,
    title,
    description,
    target,
    deadline,
    ownerBalance,
    sumOfAllDonations,
    image,
    donators,
    donations,
    isExpired,
    amountProgress
  };

  return parsedCampaign;
};