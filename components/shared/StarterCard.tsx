import React from 'react';
import WidgetsIcon from '@mui/icons-material/Widgets';

type Props = { owner: string }
const StarterCard = ({ owner }: Props) => {
  return (
    <div className="flex items-center gap-2 text-sm font-normal w-full overflow-hidden max-w-[90vw]">
      <span className='bg-themed-bg-paper rounded-full p-2 h-14 w-14 flex items-center justify-center shrink-0'>
        <WidgetsIcon fontSize='large' color='secondary' />
      </span>
      <div className='break-all min-w-0'>
        {owner}
      </div>
    </div>
  );
};

export default StarterCard;