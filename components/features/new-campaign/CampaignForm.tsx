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
import { useAddress } from '@thirdweb-dev/react';
import { useAddCampaign } from 'hooks/web3/useAddCampaign';
import { checkIfImage } from 'utils/utility';
import { ethers } from 'ethers';
import { useQueryClient } from 'react-query';
import AlertSnack from '@/components/shared/snacks/AlertSnack';

const moneyImg = '../../img/money.svg';

export type CampaignFieldName = "fullname" | "title" | "story" | "target" | "deadline" | "image";

const FormSchema = z.object({
  fullname: z.string().min(1, { message: 'Your name is required' }),
  title: z.string().min(1, { message: 'Campaign title is required' }),
  story: z.string().min(1, { message: 'Story is required' }),
  target: z.string().refine(val => Number(val) > 0, { message: 'Target must be greater than 0' }),
  deadline: z.string(),
  image: z.string().url({ message: "Enter a valid image URL" }),
})

const CampaignForm = () => {
  const [successSnack, setSuccessSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const address = useAddress();
  const queryClient = useQueryClient();
  const [date, setDate] = useState(dayjs().add(1, 'day'));
  const { mutate: addCampaign, isLoading: isSubmitting } = useAddCampaign({
    onSuccess: () => {
      zorm.form?.reset();
      setDate(dayjs().add(1, 'day'));
      queryClient.invalidateQueries("wallet-balance");
      setSuccessSnack(true)
      // *Congrats popup*
    },
    onError: (error: any) => {
      if (error.reason) {
        if (error.reason === 'user rejected transaction') return;
      }
      setErrorSnack(true);
    }
  });
  const zorm = useZorm("campaign", FormSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const form = {
        ...event.data,
        target: ethers.utils.parseUnits(event.data.target, 18)
      };
      checkIfImage(form.image, (exists) => {
        if(!exists) {
          console.log('Provide valid image URL');
        }
        addCampaign(form);
      })
    },
  });

  const handleDate = (newValue: Dayjs | null) => {
    if (newValue) setDate(newValue);
  };
  
  return (
    <>
      {isSubmitting ? <LinearProgress color='secondary' className="linear-loader" />: null}

      <form 
        ref={zorm.ref} 
        className='max-w-[1280px] mx-auto flex flex-wrap gap-20 mb-14 bg-themed-bg-paper p-4 sm:p-8 rounded-2xl blur-in' 
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
            : <ConnectButton />}
        </div>
      </form>

      <AlertSnack
        open={successSnack}
        onClose={() => setSuccessSnack(false)}
        message="Campaign has been created successfully!"
        severity="success"
      />
      <AlertSnack
        open={errorSnack}
        onClose={() => setErrorSnack(false)}
        message="Unable to create a campaign. Please check your balance and try again"
        severity="error"
      />
    </>
  );
};

export default React.memo(CampaignForm);