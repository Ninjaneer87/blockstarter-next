import CampaignForm from "@/components/features/new-campaign/CampaignForm";
import { NextPage } from "next";
import React from 'react';

const NewCampaign: NextPage = () => {
  return (
    <>
      <h1 className='heading blur-in'>Start a Campaign</h1>
      <CampaignForm />
    </>
  );
};

export default NewCampaign;