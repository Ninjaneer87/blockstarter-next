import React, { PropsWithChildren } from "react";
import Header from "./header/Header";
import SideNav from "./SideNav";
import ScrollTop from "../shared/ScrollTop";
import { Container, LinearProgress, useMediaQuery, useTheme } from "@mui/material";
import { useRouteLoading } from "hooks/useRouteLoading";
import { useIsFetching } from "react-query";
import DrawerMobile from "./DrawerMobile";

const Layout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(639));
  const isRouteLoading = useRouteLoading();
  const isQueryLoading = useIsFetching({ predicate: query => query.state.status === 'loading' }) > 0;

  return (
    <>
      {isRouteLoading || isQueryLoading ? <LinearProgress className="linear-loader" /> : null}
      <Header />
      <SideNav />
      <main className="lg:pl-[120px] py-[100px]">
        <Container maxWidth='xl' className="px-3 sm:px-6">
          {children}
        </Container>
      </main>
      <ScrollTop />
      {isSmallScreen ? <DrawerMobile /> : null}
    </>
  );
};

export default Layout;
