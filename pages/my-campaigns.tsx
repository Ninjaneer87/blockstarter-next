import { useAddress } from '@thirdweb-dev/react';
import { useCampaigns } from 'hooks/web3/useCampaigns';
import React from 'react';

const Profile = () => {
  const address = useAddress();
  const { data } = useCampaigns({
    select: data => data.filter(d => d.owner === address),
    onSuccess: (data) => console.log(data)
  });

  return (
    <div>
      <h1>BlockStarter Profile</h1>
    </div>
  );
};

export default Profile;