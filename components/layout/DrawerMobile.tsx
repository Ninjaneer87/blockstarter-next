import { ButtonBase } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { navItems } from "utils/constants";
import NextLink from 'next/link';
import ClientOnlyPortal from "../portals/ClientOnlyPortal";
import { isActive } from "utils/utility";
import { useRouter } from "next/router";

const DrawerMobile = () => {
  const [hide, setHide] = useState(false);
  const [y, setY] = useState(0);
  const { asPath: currentUrl } = useRouter();

  const handleScroll = useCallback(
    (e: Event) => {
      if (y > window.scrollY) {
        setHide(false);
      } else if (y < window.scrollY) {
        setHide(true);
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  return (
    <ClientOnlyPortal>
      <nav className={`gradient-wrapper fixed left-3 bottom-3 right-3 min-h-16 ${hide ? 'blur-out' : 'blur-in'} transition-transform overflow-hidden w-auto`}>
        <ul className="bg-glass flex gap-3 p-3 rounded-2xl justify-evenly">
          {navItems.map(item => (
            <li key={item.path} className='flex flex-col items-center'>
              <ButtonBase
                aria-label={item.label}
                focusRipple
                color="primary"
                href={item.path}
                LinkComponent={NextLink}
                className={`icon-wrapper justify-center flex-col gap-3 ${isActive(item.path, currentUrl, item.exact) ? "bg-themed-bg text-primary" : ""}`}
              >
                {item.icon}
              </ButtonBase>
              <span className={`text-[0.6rem] text-center ${isActive(item.path, currentUrl, item.exact) ? "text-primary" : ""}`}>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </ClientOnlyPortal>
  );
};

export default DrawerMobile;
