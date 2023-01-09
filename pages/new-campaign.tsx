import CampaignForm from "@/components/features/new-campaign/CampaignForm";
import React from 'react';

const NewCampaign = () => {
  return (
    <>
      <h1 className='heading my-14 blur-in'>Start a Campaign</h1>
      <CampaignForm />
    </>
  );
};

export default NewCampaign;