import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.scss";

import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  responsiveFontSizes,
  LinearProgress,
} from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "utils/createEmotionCache";
import darkThemeOptions from "@/styles/theme/darkThemeOptions";
import lightThemeOptions from "@/styles/theme/lightThemeOptions";
import { useDarkMode } from "hooks/useDarkMode";
import { useMounted } from "hooks/useMounted";
import ThemeContext from "context/themeContext";
import { NavContextProvider } from "context/navContext";
import Layout from "@/components/layout/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouteLoading } from "hooks/useRouteLoading";
import MyLoader from "@/components/shared/MyLoader";
import { Web3ContextProvider } from "context/web3Context";

const clientSideEmotionCache = createEmotionCache();
const darkTheme = responsiveFontSizes(createTheme(darkThemeOptions));
const lightTheme = responsiveFontSizes(createTheme(lightThemeOptions));

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient())
  const [dark, toggleDarkMode] = useDarkMode(null);
  const [mounted] = useMounted();
  const theme = dark ? darkTheme : lightTheme;

  useEffect(() => {
    if (mounted) document.body.style.visibility = "visible";
  }, [mounted]);

  return (

    <React.Fragment>
      <Head>
        <title>BlockStarter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
            <NavContextProvider>
              <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <ThirdwebProvider desiredChainId={activeChainId}>
                    <Web3ContextProvider>
                      <MyLoader />
                      <Layout>
                        <Component {...pageProps} />
                        <ReactQueryDevtools initialIsOpen={false} />
                      </Layout>
                    </Web3ContextProvider>
                  </ThirdwebProvider>
                </ThemeProvider>
              </CacheProvider>
            </NavContextProvider>
          </ThemeContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default MyApp;
