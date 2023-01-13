import FormField from '@/components/shared/FormField';
import { Alert, ButtonBase, CircularProgress, LinearProgress, Snackbar } from '@mui/material';
import { useDonate } from 'hooks/web3/useDonate';
import React, { useState } from 'react';
import { useZorm } from 'react-zorm';
import { z } from 'zod';
import SavingsIcon from '@mui/icons-material/Savings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ConnectButton from '@/components/shared/ConnectButton';
import { useAddress } from '@thirdweb-dev/react';
import { useQueryClient } from 'react-query';
import AlertSnack from '@/components/shared/snacks/AlertSnack';

const FormSchema = z.object({
  amount: z.string().refine(val => Number(val) > 0, { message: 'Amount must be greater than 0' }),
});

type Props = { campaignId: number }

const Donate = ({ campaignId }: Props) => {
  const [errorSnack, setErrorSnack] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);
  const address = useAddress();
  const queryClient = useQueryClient();
  const { mutate: donate, isLoading: isSubmitting } = useDonate({
    onSuccess: () => {
      zorm.form?.reset();
      queryClient.invalidateQueries(["campaign", campaignId]);
      queryClient.invalidateQueries("wallet-balance");
      setSuccessSnack(true);
    },
    onError: (error: any) => {
      if (error.reason) {
        if (error.reason === 'user rejected transaction') return;
      }
      setErrorSnack(true);
    }
  });
  const zorm = useZorm("donate", FormSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const donation = {
        id: campaignId,
        amount: event.data.amount
      }
      donate(donation);
    }
  })
  return (
    <>
      {isSubmitting ? <LinearProgress className="linear-loader" /> : null}

      <form
        ref={zorm.ref}
        className='flex flex-col gap-4 p-4 sm:gap-8 sm:p-8 rounded-2xl bg-themed-bg-paper h-fit'
      >
        <h3 className='text-center m-0'>Donate to campaign</h3>
        <FormField
          name="amount"
          label="Donation amount"
          placeholder="ETH 0.1"
          icon={<SavingsIcon color='primary' />}
          type="number"
          error={zorm.errors.amount(Boolean)}
        />
        <div className='p-4 text-sm rounded-lg bg-themed-bg'>
          <div className='font-bold '>
            Back it because you believe in it.
          </div>

          <div className='opacity-70 mt-3 font-normal'>
            Support the project for no reward, just because it speaks to you.
          </div>
          <small className='mt-3 flex shrink-0 items-start text-secondary'>
            If the target amount is not met before the deadline, you will be able to request a refund.
          </small>
        </div>


        {address
          ? <ButtonBase focusRipple disabled={isSubmitting} className='blur-in gradient-button w-fullmx-auto' type='submit' >
            {isSubmitting
              ? <CircularProgress color='inherit' size={24} />
              : <>Send donation<RocketLaunchIcon /></>}
          </ButtonBase>
          : <ConnectButton className='w-full' />}
      </form>
      
      <AlertSnack
        open={successSnack}
        onClose={() => setSuccessSnack(false)}
        message="Donation has been sent successfully"
        severity="success"
      />

      <AlertSnack
        open={errorSnack}
        onClose={() => setErrorSnack(false)}
        message="Unable to send donation. Please, check your balance or and try again"
        severity="error"
      />
    </>
  );
};

export default React.memo(Donate);