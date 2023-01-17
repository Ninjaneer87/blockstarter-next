import React from "react";
import { ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useCallback } from "react";
import { useCountDown } from "hooks/useCountDown";

type Props = {
  code: string;
  message: string;
  buttonText: string;
};
const ErrorPage = ({ code, message, buttonText }: Props) => {
  const router = useRouter();
  const goHome = useCallback(() => {
     router.replace("/");
  }, [router]);
  const counter = useCountDown(10, goHome);

  return (
    <div className="flex flex-col py-[40px] items-center justify-center">
      <div className="flex flex-col items-center w-[600px] max-w-[90vw] gap-10">
        <div className="border-red-500 border-solid h-[250px] w-[250px] flex justify-center items-center shadow-3d-card rounded-full p-5">
          <Typography
            component="h1"
            variant="h1"
            className="text-red-500 text-center"
          >
            {code}
          </Typography>
        </div>
        <Typography variant="h2" component="h2" className="text-center">
          {message}
        </Typography>

        <ButtonBase
          className="gradient-error-button w-full max-w-[400px] "
          onClick={goHome}
        >
          {buttonText} ({counter})<ErrorOutlineIcon />
        </ButtonBase>
      </div>
    </div>
  );
};

export default ErrorPage;
