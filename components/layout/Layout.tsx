import React, { PropsWithChildren } from "react";
import Header from "./header/Header";
import SideNav from "./SideNav";
import ScrollTop from "../shared/ScrollTop";
import { Container, LinearProgress } from "@mui/material";
import { useRouteLoading } from "hooks/useRouteLoading";
import { useIsFetching } from "react-query";

const Layout = ({ children }: PropsWithChildren) => {
  const isRouteLoading = useRouteLoading();
  const isFetching = useIsFetching() > 0;

  return (
    <>
      {isFetching ? <LinearProgress className="linear-loader" /> : null}
      <Header />
      <SideNav />
      <main className="lg:pl-[120px] py-[100px]">
        <Container maxWidth='xl' className="px-3 sm:px-6">
          {children}
        </Container>
      </main>
      <ScrollTop />
    </>
  );
};

export default Layout;
