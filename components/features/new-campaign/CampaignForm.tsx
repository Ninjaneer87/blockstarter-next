import { ButtonBase } from '@mui/material';
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
import { useWeb3Context } from 'context/web3Context';
import ConnectButton from '@/components/shared/ConnectButton';

export type CampaignFieldName = "fullname" | "title" | "story" | "target" | "deadline" | "image";

const FormSchema = z.object({
  fullname: z.string().min(1, { message: 'Your name is required' }),
  title: z.string().min(1, { message: 'Campaign title is required' }),
  story: z.string().min(1, { message: 'Story is required' }),
  target: z.string().refine(val => Number(val) > 0, { message: 'Target must be greater than 0' }),
  deadline: z.string().refine(val => new Date(val) > new Date(), { message: 'Pick a date in the future' }),
  image: z.string().url({ message: "Enter a valid image URL" }),
})

const CampaignForm = () => {
  const { address } = useWeb3Context();
  const [date, setDate] = useState(dayjs(new Date()));
  const form = useZorm("campaign", FormSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      console.log('Form submitted');
    },
  });

  const handleDate = (newValue: Dayjs | null) => {
    if (newValue) setDate(newValue);
  };

  return (
    <form ref={form.ref} className='max-w-[1280px] mx-auto flex flex-wrap gap-20 my-14 bg-themed-bg-paper p-4 sm:p-8 rounded-2xl blur-in' >
      {campaignFormItems.map(field => (
        <div key={field.name} className={`grow ${field.multiline ? 'basis-full' : 'basis-72'}`}>
          {field.name === 'deadline'
            ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  DialogProps={{ classes: { paper: 'bg-themed-bg' } }}
                  label="Set campaign deadline"
                  value={date}
                  onChange={handleDate}
                  inputFormat="DD/MM/YYYY"
                  minDate={dayjs(new Date())}
                  renderInput={({ InputProps, ...otherProps }) => (
                    <FormField
                      name={field.name}
                      label={field.label}
                      icon={field.icon}
                      props={otherProps}
                      error={form.errors[field.name](Boolean)}
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
                error={form.errors[field.name](Boolean)}
              />}
        </div>
      ))}

      <div className="w-full flex justify-center items-center">
        {address 
          ? <ButtonBase className='blur-in gradient-button w-[400px] max-w-full' type='submit' >
              Create campaign <CampaignIcon />
            </ButtonBase>
          : <ConnectButton />}
      </div>
    </form>
  );
};

export default CampaignForm;