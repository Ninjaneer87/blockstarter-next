import React from 'react';
import ButtonBase from "@mui/material/ButtonBase";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NextLink from "next/link";
import { Container } from '@mui/material';

type Props = {
  title: string;
  buttonText: string;
}
const NoCampaignsYet = ({ title, buttonText }: Props) => {
  return (
    <Container maxWidth='xs' className="blur-in text-xl px-0 text-center">
      {title}
      <ButtonBase focusRipple
        className='gradient-button mt-8'
        href="/create"
        LinkComponent={NextLink}
      >
        {buttonText} <ArrowRightAltIcon />
      </ButtonBase>
    </Container>
  );
};

export default NoCampaignsYet;