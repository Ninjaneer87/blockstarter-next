import Logo from "@/components/shared/Logo";
import CampaignCard from "@/components/shared/CampaignCard";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <h1>BlockStarter Home</h1>
      <CampaignCard />
    </>
  );
};

export default Home;
