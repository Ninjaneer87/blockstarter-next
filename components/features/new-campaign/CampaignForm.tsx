import { ButtonBase, CircularProgress, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { useZorm } from 'react-zorm';
import CampaignIcon from '@mui/icons-material/Campaign';
import { z } from 'zod';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormField from '@/components/shared/FormField';
import { campaignFormItems } from 'utils/constants';
import ConnectButton from '@/components/shared/ConnectButton';
import { useAddCampaign } from 'hooks/web3/useAddCampaign';
import { checkIfImage } from 'utils/utility';
import { ethers } from 'ethers';
import { useQueryClient } from 'react-query';
import AlertSnack from '@/components/shared/snacks/AlertSnack';
import { useWeb3Context } from 'context/web3Context';
import { ValidSubmitEvent } from 'react-zorm/dist/use-zorm';
import { useRouter } from 'next/router';

const moneyImg = '../../img/money.svg';

export type CampaignFieldName = "title" | "story" | "target" | "deadline" | "image";
type CampaignFields = {
  title: string;
  story: string;
  target: string;
  deadline: string;
  image: string;
}

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Campaign title is required' }),
  story: z.string().min(1, { message: 'Story is required' }),
  target: z.string().refine(val => Number(val) > 0, { message: 'Target must be greater than 0' }),
  deadline: z.string(),
  image: z.string().url({ message: "Enter a valid image URL" }),
})

const CampaignForm = () => {
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { address } = useWeb3Context();
  const queryClient = useQueryClient();
  const [date, setDate] = useState(dayjs().add(1, 'day'));
  const { mutate: addCampaign, isLoading: isSubmitting } = useAddCampaign({ onSuccess, onError });
  const zorm = useZorm("campaign", FormSchema, { onValidSubmit });
  const router = useRouter();

  function onSuccess() {
    queryClient.invalidateQueries("wallet-balance");
    router.push('/profile');
  }

  function onError(error: any) {
    if (error.reason) {
      if (error.reason === 'user rejected transaction') return;
    }
    setErrorMessage("Unable to create a campaign. Please check your balance and try again")
    setErrorSnack(true);
  }

  async function onValidSubmit(event: ValidSubmitEvent<CampaignFields>) {
    event.preventDefault();
    const form = {
      ...event.data,
      target: ethers.utils.parseUnits(event.data.target, 18)
    };
    checkIfImage(form.image, (exists) => {
      if(!exists) {
        setErrorMessage("Unable to create a campaign. Please provide a valid image URL")
        setErrorSnack(true);
        return;
      }
      addCampaign(form);
    })
  }

  const handleDate = (newValue: Dayjs | null) => {
    if (newValue) setDate(newValue);
  };
  
  return (
    <>
      {isSubmitting ? <LinearProgress color='secondary' className="linear-loader" />: null}

      <form 
        ref={zorm.ref} 
        className='max-w-[1280px] mx-auto flex flex-wrap gap-10 sm:gap-20 mb-14 bg-themed-bg-paper p-4 py-8 sm:p-8 rounded-2xl blur-in' 
      >
        {campaignFormItems.map(field => (
          <div key={field.name} className={`grow ${field.multiline ? 'basis-full' : 'basis-72'}`}>
            {field.name === 'deadline'
              ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    DialogProps={{ classes: { paper: 'bg-themed-bg' } }}
                    label="Set campaign deadline"
                    value={date}
                    onChange={handleDate}
                    inputFormat="MM/DD/YYYY"
                    minDate={dayjs().add(1, 'day')}
                    renderInput={({ InputProps, ...otherProps }) => (
                      <FormField
                        name={field.name}
                        label={field.label}
                        icon={field.icon}
                        props={otherProps}
                        error={zorm.errors[field.name](Boolean)}
                      />
                    )}
                  />
                </LocalizationProvider>
              : <FormField
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  icon={field.icon}
                  multiline={field.multiline}
                  type={field.type}
                  error={zorm.errors[field.name](Boolean)}
                />}
          </div>
        ))}

        <div className='flex items-center text-white bg-secondary px-4 py-8 rounded-2xl gap-4 w-full font-semibold'>
          <img src={moneyImg} alt="Cash" />
          <span className='sm:text-2xl'>You will get 100% of the raised amount</span>
        </div>

        <div className="w-full flex justify-center items-center">
          {address 
            ? <ButtonBase focusRipple disabled={isSubmitting} className='blur-in gradient-button w-[400px] max-w-full' type='submit' >
                {isSubmitting 
                  ? <CircularProgress color='inherit' size={24} /> 
                  : <>Create campaign <CampaignIcon /></>}
              </ButtonBase>
            : <ConnectButton className='w-[500px] max-w-full' />}
        </div>
      </form>
      
      <AlertSnack
        open={errorSnack}
        onClose={() => setErrorSnack(false)}
        message={errorMessage}
        severity="error"
      />
    </>
  );
};

export default React.memo(CampaignForm);