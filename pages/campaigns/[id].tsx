import CampaignInfo from "@/components/features/campaign-details/CampaignInfo";
import Donate from "@/components/features/campaign-details/Donate";
import DonationStats from "@/components/features/campaign-details/DonationStats";
import Expired from "@/components/features/campaign-details/Expired";
import ImageAndProgress from "@/components/features/campaign-details/ImageAndProgress";
import Withdraw from "@/components/features/campaign-details/Withdraw";
import { Container, Alert, AlertTitle } from "@mui/material";
import { useWeb3Context } from "context/web3Context";
import { useCampaign } from "hooks/web3/useCampaign";
import { useRefundableBalance } from "hooks/web3/useRefundableBalance";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { daysLeft } from "utils/utility";

const CampaignDetails: NextPage = () => {
  const { address } = useWeb3Context();
  const { query: { id } } = useRouter();
  const [invalidCampaign, setInvalidCampaign] = useState(false);
  const { data: campaign, isLoading } = useCampaign(+id!, {
    onSettled: (data) => {!data && setInvalidCampaign(true)}
  });
  const {data: refundableBalance} = useRefundableBalance(+id!, {
    select: data => data === undefined ? "0" : data
  });

  return (
    <>
      {campaign && !isLoading
        ? <Container maxWidth='lg' className="p-0 blur-in">
            <h1 className='heading blur-in' >{campaign.title}</h1>

            {campaign.amountProgress === 100
              ? <Alert severity="success" variant="standard" className="my-6">
                  <AlertTitle>Success</AlertTitle>
                  This campaign has reached the target amount, and it will be accepting donations indefinitelly.
                </Alert>
              : null}

            {campaign.isExpired
              ? <Alert severity="error" variant="standard" className="my-6">
                  <AlertTitle>Campaign failed</AlertTitle>
                  This campaign has failed to reach the target amount, and it is not accepting donations any more.
                </Alert>
              : null}

            <div className="grid grid-cols-[1fr] md:grid-cols-[2fr,_1fr] gap-8">
              <ImageAndProgress
                image={campaign.image}
                progress={campaign.amountProgress}
                isExpired={campaign.isExpired}
                isSuccess={campaign.amountProgress === 100}
              />

              {/* Campaign is active  (hide it if the user is owner and target is reached)*/}
              {!campaign.isExpired && !(campaign.owner === address && campaign.amountProgress === 100)
                ? <Donate campaignId={campaign.pId} target={campaign.target} />
                : null}

              {/* Campaign expired, user not connected or has NO withdrawable balance */}
              {campaign.isExpired && !address || (campaign.isExpired && address && !(+refundableBalance! > 0))
                ? <Expired amount={+campaign.ownerBalance} />
                : null}

              {/* Campaign expired, user has withdrawable balance */}
              {campaign.isExpired && address &&  +refundableBalance! > 0
                ? <Withdraw type="refund" campaignId={campaign.pId} amount={refundableBalance!} />
                : null}

              {/* Campaign SUCCESS and user is the campaign owner*/}
              {campaign.amountProgress === 100 && address && campaign.owner === address
                ? <Withdraw type="cashout" campaignId={campaign.pId} amount={campaign.ownerBalance} />
                : null}
            </div>

            <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr,_1fr] md:grid-cols-[1fr,_3fr] mt-8 gap-8">
              <DonationStats
                daysLeft={daysLeft(campaign.deadline)}
                amountRaised={campaign.sumOfAllDonations}
                backersCount={campaign.donators?.length}
                target={campaign.target}
                isExpired={campaign.isExpired}
              />
              <CampaignInfo
                owner={campaign.owner}
                story={campaign.description}
                donators={campaign.donators || []}
                donations={campaign.donations || []}
                isExpired={campaign.isExpired}
              />
            </div>
          </Container>
        : null}

      {invalidCampaign
        ? <Alert severity="error" variant="outlined" className=" mt-12 w-fit mx-auto">
            <AlertTitle>This campaign does not exist</AlertTitle>
            Seems like you're looking for something that doesn't exist... or does it!?
          </Alert>
        : null}
    </>
  );
};

export default CampaignDetails;
