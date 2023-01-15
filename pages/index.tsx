import type { NextPage } from "next";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useCampaigns } from "hooks/web3/useCampaigns";
import { useMemo } from "react";
import { ButtonBase } from "@mui/material";
import NextLink from "next/link";

const shapeImg = '/img/shapes.svg'

const Home: NextPage = () => {
  const { data } = useCampaigns();

  const count = useMemo(() => {
    if (!data) return;

    const campaignCount = data.length;
    const owners = data.map(campaign => campaign.owner);
    const uniqueOwners = [...new Set(owners)];
    const ownersCount = uniqueOwners.length;

    return { campaignCount, ownersCount }
  }, [data])

  return (
    data ?
      <>
        <div className="w-[800px] min-h-[600px] max-w-full relative mx-auto bg-[url('/img/shapes.svg')] bg-contain bg-no-repeat  mt-10 lg:mt-20 blur-in">
          <div className='w-[500px] max-w-full mx-auto p-6 flex flex-col gap-6'>
            <div>
              <div className="text-secondary uppercase text-sm">INTRODUCING</div>
              <h1 className='m-0 mt-2'>BlockStarter - Campaigns</h1>
            </div>

            <div className="dark:opacity-90 font-light">
              Blockstarter is a platform for decentralized crowdfunding, empowering anyone to bring their innovative projects to life through the support of the community.
            </div>

            <div className="grid grid-cols-[1fr,1fr] rounded-2xl bg-themed-bg-paper p-6 gap-8 w-fit">
              <div className='w-full flex flex-col'>
                <div className='text-4xl font-bold grow flex items-center text-primary'>
                  <span className='truncate max-w-[250px]'>{count?.campaignCount}</span>
                </div>
                <div className='opacity-90 mt-2 flex items-center font-light'>
                  <span className='truncate max-w-[250px]'>Campaigns</span>
                </div>
              </div>

              <div className='w-full flex flex-col'>
                <div className='text-4xl font-bold grow flex items-center text-secondary'>
                  <span className='truncate max-w-[250px]'>{count?.ownersCount}</span>
                </div>
                <div className='opacity-90 mt-2 flex items-center font-light'>
                  <span className='truncate max-w-[250px]'>Starters</span>
                </div>
              </div>
            </div>

            <ButtonBase focusRipple className='blur-in gradient-button'
              href="/campaigns"
              LinkComponent={NextLink}>
              Campaigns <ArrowRightAltIcon />
            </ButtonBase>
          </div>
        </div>
      </>
      : null
  );
};

export default Home;
