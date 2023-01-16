import { useEffect } from 'react';
import { ButtonBase, useMediaQuery, useTheme, Divider } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { navItems } from 'utils/constants';
import { isActive } from 'utils/utility';
import LogoutIcon from '@mui/icons-material/Logout';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ClientOnlyPortal from '../portals/ClientOnlyPortal';
import { useThemeContext } from 'context/themeContext';
import { useNavContext } from 'context/navContext';
import AuthInfo from '../shared/AuthInfo';
import { useDisconnect } from '@thirdweb-dev/react';
import Search from './header/Search';
import { useWeb3Context } from 'context/web3Context';

const SideNav = () => {
  const { expanded, mounted, setExpanded } = useNavContext();
  const { asPath: currentUrl } = useRouter();
  const { dark, toggleDarkMode } = useThemeContext();
  const { address } = useWeb3Context();
  const disconnect = useDisconnect();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1024));
  const isCollapsed = isSmallScreen && !expanded;

  const handleLogout = async () => {
    await disconnect();
    handleClose();
  }

  const handleClose = () => {
    if(isSmallScreen) setExpanded(false)
  }

  useEffect(() => {
    setExpanded(false);
  }, [isSmallScreen])

  return (
    <ClientOnlyPortal>
      {mounted || !isSmallScreen
        ? <nav
            className={`
              flex flex-col gap-7 justify-between blur-in p-5 rounded-2xl max-lg:shadow-themed-shadow overflow-auto
              fixed top-[100px] max-sm:left-3 left-6 max-sm:right-3 max-lg:right-6 bg-glass max-sm:bottom-3 bottom-6 z-30
              ${isCollapsed ? 'blur-out' : ''}
            `}
          >
            <ul className='flex flex-col gap-3 lg:gap-7'>
              {navItems.map(item => (
                <li key={item.path} className='flex flex-col lg:items-center gap-1 max-lg:w-full'>
                  <ButtonBase
                    aria-label={item.label}
                    focusRipple
                    color="primary"
                    href={item.path}
                    LinkComponent={NextLink}
                    onClick={handleClose}
                    className={`icon-wrapper justify-start gap-3 ${isActive(item.path, currentUrl, item.exact) ? "bg-themed-bg text-primary" : ""} lg:w-fit`}
                  >
                    {item.icon} {isSmallScreen ? <span>{item.label}</span> : ''}
                  </ButtonBase>
                  {isSmallScreen 
                    ? null 
                    : <span className={`text-[0.6rem] ${isActive(item.path, currentUrl, item.exact) ? "text-primary" : ""}`}>
                        {item.label}
                      </span>}
                </li>
              ))}
            </ul>

            {isSmallScreen
              ? <>
                  <Divider className="bg-primary w-full" />
                  <AuthInfo />
                  <Divider className="bg-primary w-full" />
                </>
              : null}

            <ul className='flex flex-col gap-3 lg:gap-7'>
              {address 
                ? <li className='flex flex-col lg:items-center gap-1 max-lg:w-full'>
                    <ButtonBase
                      aria-label="Logout"
                      focusRipple
                      color="primary"
                      className='icon-wrapper justify-start gap-3 text-base grow blur-in'
                      onClick={handleLogout}
                    >
                      <LogoutIcon fontSize='large' /> {isSmallScreen ? <span>logout</span> : ''}
                    </ButtonBase>
                    {isSmallScreen 
                      ? null 
                      : <span className='text-[0.6rem]'>disconnect</span>}
                  </li>
                : null}

              <li className='flex flex-col lg:items-center gap-1 max-lg:w-full'>
                <ButtonBase
                  aria-label="dark toggle"
                  focusRipple
                  color="primary"
                  className={`icon-wrapper justify-start gap-3 text-base ${dark ? 'bg-themed-bg text-primary' : ''}`}
                  onClick={toggleDarkMode}
                >
                  <NightsStayIcon fontSize='large' /> {isSmallScreen ? <span>theme</span> : ''}
                </ButtonBase>
                {isSmallScreen 
                  ? null 
                  : <span className={`text-[0.6rem] ${dark ? "text-primary" : ""}`}>theme</span>}
              </li>
            </ul>
          </nav>
        : null}
    </ClientOnlyPortal>
  );
};

export default React.memo(SideNav);