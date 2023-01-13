import CampaignInfo from "@/components/features/campaign-details/CampaignInfo";
import Donate from "@/components/features/campaign-details/Donate";
import DonationStats from "@/components/features/campaign-details/DonationStats";
import ImageAndProgress from "@/components/features/campaign-details/ImageAndProgress";
import { Container, Typography } from "@mui/material";
import { useCampaign } from "hooks/web3/useCampaign";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { calculateBarPercentage, daysLeft } from "utils/utility";

const CampaignDetails: NextPage = () => {
  const { query: { id } } = useRouter();
  const { data: campaign } = useCampaign(+id!);
  const donationProgress = campaign ? calculateBarPercentage(+campaign.target, +campaign.sumOfAllDonations) : 0;

  return (
    campaign
      ? <Container maxWidth='lg' className="p-0 blur-in">
        <h1 className='heading blur-in' >{campaign.title}</h1>  

        <div className="grid grid-cols-[1fr] md:grid-cols-[2fr,_1fr] gap-8">
          <ImageAndProgress image={campaign.image} progress={donationProgress} />
          <Donate campaignId={campaign.pId} />
        </div>

        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr,_1fr] md:grid-cols-[1fr,_3fr] mt-8 gap-8">
          <DonationStats 
            daysLeft={daysLeft(campaign.deadline)} 
            amountRaised={campaign.sumOfAllDonations} 
            backersCount={campaign.donators?.length} 
            target={campaign.target}
          />
          <CampaignInfo 
            owner={campaign.owner}
            story={campaign.description}
            donators={campaign.donators || []}
            donations={campaign.donations || []}
          />
        </div>
      </Container>
      : null
  );
};

export default CampaignDetails;
