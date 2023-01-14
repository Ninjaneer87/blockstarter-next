import React from 'react';
import { LinearProgress } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

type Props = {
  image: string;
  progress: number;
  isExpired: boolean;
  isSuccess: boolean;
}

const ImageAndProgress = ({ image, progress, isExpired, isSuccess }: Props) => {
  return (
    <div>
      <img src={image} alt="" className="block w-full rounded-2xl object-cover aspect-video h-[450px] object-center" />
      <div className="flex items-center gap-4">
        <LinearProgress color={isExpired ? 'error' : 'primary'} variant="determinate" value={progress} className='h-3 rounded-2xl my-3 w-full' />
        {isExpired 
          ? <CloseIcon color='error' /> 
          : isSuccess 
            ? <TaskAltIcon color="primary" fontSize='large' />
            : <SavingsIcon color="primary" />}
      </div>
    </div>
  );
};

export default React.memo(ImageAndProgress);