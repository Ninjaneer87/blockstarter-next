import { Campaign } from '@/types/campaign';
import NextLink from "next/link";
import React from 'react';
import { daysLeft } from 'utils/utility';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Divider, ButtonBase } from '@mui/material';
import { useThemeContext } from 'context/themeContext';

type Props = { 
  campaign: Campaign;
  address: string | undefined
 };

const CampaignCard = ({ campaign, address }: Props) => {
  const { dark } = useThemeContext();
  const remainingDays = daysLeft(campaign.deadline);

  return (
    <ButtonBase 
      focusRipple
      href={`/campaigns/${campaign.pId}`}
      LinkComponent={NextLink}
      className={`${dark ? 'gradient-wrapper' : ''} w-full`}
    >
      <div className='rounded-2xl bg-themed-bg-paper p-4 inline-block w-full'>
        <img
          src={campaign.image}
          alt="fund"
          className="w-full h-[160px] object-cover rounded-2xl"
        />
        <h2 
          title={campaign.title} 
          className="mt-2 truncate text-base bg-clip-text text-transparent gradient font-bold transition-colors py-4 m-0 uppercase"
        >
          {campaign.title}
        </h2>
        <Divider className='mb-6 bg-themed-border dark:opacity-30 opacity-20' />

        <p className="truncate text-xs font-normal dark:opacity-80">{campaign.description}</p>

        <div className="grid grid-cols-2 text-xs">
          <div >
            <p>
              GOR {' '}
              <span 
                className={`
                  dark:opacity-80
                  ${campaign.isExpired ? 'text-red-400' : ''} 
                  ${campaign.amountProgress === 100 ? 'text-primary' : ''}
                `}
              >
                {campaign.sumOfAllDonations}
              </span>
            </p>
            <p title={campaign.target} className='truncate dark:opacity-60'>Raised of {campaign.target}</p>
          </div>

          <div className='text-right'>
            <p 
              className={`
                ${campaign.isExpired ? 'text-red-400' : ''} 
                ${remainingDays === "Last day" && campaign.amountProgress !== 100 ? 'text-orange-400' : ''}
                ${campaign.amountProgress === 100 ? 'text-primary' : ''}
              `}>
              {campaign.amountProgress === 100 ? 'Target reached' : remainingDays}
            </p>
            <p className='dark:opacity-60'>
              {campaign.amountProgress === 100 ? 'Accepting donations' : 'Days remaining'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs mt-4 font-normal">
          <span className='bg-themed-bg rounded-full p-2 h-8 w-8 flex items-center justify-center'>
            <WidgetsIcon fontSize='small' color='secondary' />
          </span>
          <div className='truncate'>
            <span className='dark:opacity-70'>by </span>
            <span>
              {campaign.owner === address 
                ? <span className='inline-flex items-center ml-1 bg-themed-bg rounded-xl p-1 px-2 text-secondary font-bold'>Me</span> 
                : campaign.owner}
            </span>
          </div>
        </div>
      </div>
    </ButtonBase>
  );
};

export default React.memo(CampaignCard);