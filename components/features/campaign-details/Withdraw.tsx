import { ButtonBase, CircularProgress, LinearProgress } from '@mui/material';
import { useCashout } from 'hooks/web3/useCashout';
import { useRefund } from 'hooks/web3/useRefund';
import React, { useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AlertSnack from '@/components/shared/snacks/AlertSnack';
import { useQueryClient } from 'react-query';

type Props = {
  campaignId: number;
  amount: string;
  type: "refund" | "cashout";
};

const Withdraw = ({ campaignId, amount, type }: Props) => {
  const [errorSnack, setErrorSnack] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);
  const queryClient = useQueryClient();
  const isCashout = type === "cashout";
  const { mutate: refund, isLoading: isRefunding } = useRefund({ onSuccess, onError });
  const { mutate: cashout, isLoading: isCashingOut } = useCashout({ onSuccess, onError });
  
  function onSuccess() {
    queryClient.invalidateQueries(["campaign", campaignId]);
    queryClient.invalidateQueries("wallet-balance");
    setSuccessSnack(true);
  }
  function onError(error: any) {
    if (error.reason) {
      if (error.reason === 'user rejected transaction') return;
    }
    setErrorSnack(true);
  }

  const handleWithdraw = async () => {
    (isCashout)
      ? cashout({ campaignId, amount })
      : refund({ campaignId, amount });
  };

  return (
    <>
      {isRefunding || isCashingOut ? <LinearProgress className="linear-loader" /> : null}

      <div className='blur-in flex flex-col gap-4 p-4 sm:gap-8 sm:p-8 rounded-2xl bg-themed-bg-paper h-fit'>
        <h3 className='text-center m-0'>
          {isCashout 
            ? 'Your funds are waiting for you' 
            : 'Request a refund'}
        </h3>

        <div className='p-4 text-sm rounded-lg bg-themed-bg'>
          <div className='font-bold '>
            {isCashout 
              ? 'Your idea seems to have attracted a lot of attention, and you are now able to bring it to life.' 
              : 'Looks like this idea did not come to life, but no worries, you are still able to get your funds back.'}
          </div>

          <small className='mt-3 flex shrink-0 items-start text-secondary'>
            {isCashout 
              ? 'Good luck!' 
              : 'Better luck next time!'}
          </small>
        </div>

        <div className='text-sm rounded-lg'>
          <div className='opacity-80 font-normal'>Available amount</div>
          <div className="text-2xl break-all">{amount}</div>
        </div>

        <ButtonBase 
          focusRipple 
          disabled={isRefunding || isCashingOut || !(+amount > 0)} 
          className={`gradient-button ${isRefunding || isCashingOut || !(+amount > 0) ? 'grayscale' : ''}`}
          onClick={handleWithdraw}
        >
          {isRefunding || isCashingOut
            ? <CircularProgress color='inherit' size={24} />
            : <>Withdraw now<KeyboardReturnIcon /></>}
        </ButtonBase>

        <AlertSnack
          open={successSnack}
          onClose={() => setSuccessSnack(false)}
          message="Withdrawal successfully completed"
          severity="success"
        />

        <AlertSnack
          open={errorSnack}
          onClose={() => setErrorSnack(false)}
          message="Unable to withdraw. Please check your balance and try again"
          severity="error"
        />
      </div>
    </>
  );
};

export default Withdraw;