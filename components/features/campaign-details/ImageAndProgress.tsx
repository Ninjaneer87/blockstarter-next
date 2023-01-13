import React from 'react';
import { LinearProgress } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';

type Props = {
  image: string;
  progress: number;
}

const ImageAndProgress = ({ image, progress }: Props) => {
  return (
    <div>
      <img src={image} alt="" className="block w-full rounded-2xl object-cover aspect-video h-[450px] object-center" />
      <div className="flex items-center gap-4">
        <LinearProgress variant="determinate" value={progress} className='h-3 rounded-2xl my-3 w-full' />
        <SavingsIcon color="primary" />
      </div>
    </div>
  );
};

export default React.memo(ImageAndProgress);