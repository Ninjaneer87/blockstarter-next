import React from 'react';
import Logo from '../../shared/Logo';
import Search from './Search';
import AuthInfo from '../../shared/AuthInfo';
import { useMediaQuery, useTheme } from '@mui/material';
import HamburgerButton from '@/components/shared/HamburgerButton';
import { useNavContext } from 'context/navContext';

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1024));
  const { expanded, toggleExpanded, mounting } = useNavContext();

  return (
    <header className='fixed top-0 left-0 right-0 bg-gradient-to-b from-themed-bg via-themed-bg to-transparent px-3 sm:px-6 z-10'>
      <div className='flex items-center py-6 gap-1 sm:gap-4'>
        <Logo withLabel />

        <div className="ml-auto"></div>
        <div className="hidden lg:flex flex-1 max-w-[450px] ">
          <Search />
        </div>
        {isSmallScreen 
          ? <HamburgerButton
              className='icon-wrapper bg-themed-bg-paper'
              aria-controls="mobile-navigation"
              aria-label="Toggle-navigation"
              aria-expanded={expanded}
              onClick={toggleExpanded}
              expanded={expanded} 
              disabled={mounting}
            /> 
          : <AuthInfo />}
      </div>
    </header>
  );
};

export default React.memo(Header);