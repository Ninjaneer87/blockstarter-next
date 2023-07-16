import type { NextPage } from "next";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NextLink from "next/link";
import { useCampaigns } from "hooks/web3/useCampaigns";
import { useMemo } from "react";
import { ButtonBase, CircularProgress } from "@mui/material";

const Home: NextPage = () => {
  const { data } = useCampaigns();

  const count = useMemo(() => {
    if (!data) return;

    const campaignsCount = data.length;
    const owners = data.map(campaign => campaign.owner);
    const uniqueOwners = [...new Set(owners)];
    const ownersCount = uniqueOwners.length;

    return { campaigns: campaignsCount, owners: ownersCount }
  }, [data])

  return (
    <>
      <div className="w-[800px] min-h-[50vh] 2xl:min-h-[60vh] max-w-full relative mx-auto bg-[url('/img/shapes.svg')] bg-contain bg-no-repeat  mt-10 lg:mt-20 blur-in">
        <div className='w-[500px] max-w-full mx-auto flex flex-col gap-6'>
          <div>
            <div className="text-secondary uppercase text-sm">INTRODUCING</div>
            <h1 className='m-0 mt-2'>BlockStarter - Campaigns</h1>
          </div>

          <div
            className="
                font-normal relative backdrop-blur-3xl
                after:content-[''] after:absolute after:z-[-1] after:bg-primary  after:opacity-70 
                after:top-[-12px] after:bottom-[50%] after:left-[-12px] after:w-[80px]
                after:rounded-r-full
                before:content-[''] before:absolute before:z-[-1] before:bg-secondary before:opacity-70 
                before:bottom-[-12px] before:top-[50%] before:left-[-12px] before:w-[80px]
                before:rounded-r-full
              "
          >
            Blockstarter is a platform for decentralized crowdfunding, empowering anyone to bring their innovative projects to life through the support of the community.
          </div>

          <div className="grid grid-cols-[1fr,1fr] rounded-2xl bg-themed-bg-paper p-6 gap-8 w-fit">
            <div className='w-full flex flex-col'>
              <div className='text-4xl font-bold grow flex items-center text-primary'>
                {count
                  ? <span className='truncate max-w-[250px] blur-in'>{count.campaigns}</span>
                  : <CircularProgress color="primary" />
                }
              </div>
              <div className='opacity-90 mt-2 flex items-center font-light'>
                <span className='truncate max-w-[250px]'>Campaigns</span>
              </div>
            </div>

            <div className='w-full flex flex-col'>
              <div className='text-4xl font-bold grow flex items-center text-secondary'>
                {count
                  ? <span className='truncate max-w-[250px] blur-in'>{count.owners}</span>
                  : <CircularProgress color="secondary" />
                }
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
  );
};

export default Home;
