import React, { PropsWithChildren } from "react";
import Header from "./header/Header";
import SideNav from "./SideNav";
import ScrollTop from "../shared/ScrollTop";
import { Container } from "@mui/material";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <SideNav />
      <main className="lg:pl-[120px] pt-[100px]">
        <Container maxWidth='xl' className="px-3 sm:px-6">
          {children}
        </Container>
      </main>
      <ScrollTop />
    </>
  );
};

export default Layout;
