import React, { MouseEventHandler, useContext } from "react";
import { Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import NavContext from "context/navContext";
import WidgetsIcon from '@mui/icons-material/Widgets';

import { ButtonBase, useTheme, useMediaQuery } from "@mui/material";

type Props = {
  withLabel?: boolean;
};

const Logo = ({ withLabel }: Props) => {
  const { setExpanded } = useContext(NavContext);
  const { asPath } = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(768));

  const logoHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (asPath === "/") {
      event.preventDefault();
      document.body.scrollIntoView({ behavior: "smooth" });
    }

    setExpanded(false);
  };

  return (
    <div className="gradient-wrapper blur-in">
      <ButtonBase
        focusRipple
        href="/"
        LinkComponent={NextLink}
        className="flex text-center items-center pl-0 pr-0 md:pr-3 h-[51px] box-border icon-wrapper bg-glass shrink-0 text-primary"
        onClick={logoHandler}
      >
        <span className="icon-wrapper text-primary">
          <WidgetsIcon fontSize="large" color="primary" />
        </span>
        {withLabel && !isSmallScreen 
          ? <Typography component='span' className="block text-[1.8rem] font-[500] bg-clip-text text-transparent gradient shrink-0">
              BlockStarter
            </Typography>
          : null}
      </ButtonBase>
    </div>
  );
};

export default React.memo(Logo);
