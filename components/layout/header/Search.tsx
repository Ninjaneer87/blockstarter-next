import { ButtonBase } from '@mui/material';
import { useNavContext } from 'context/navContext';
import React from 'react';
import { FormEventHandler } from 'react';

const search = '/img/search.svg';

const Search = () => {
  const { setExpanded } = useNavContext();

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setExpanded(false);
    console.log('Search Submitted');
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="flex w-full max-lg:shadow-themed-shadow py-2 pl-4 pr-2 h-[51px] bg-glass rounded-full mx-auto shrink-0"
    >
      <input
        type="text"
        placeholder="Search coming soon..."
        className="w-full text-sm placeholder:text-placeholder bg-transparent outline-none border-none text-themed-text"
        spellCheck={false}
      />
      <ButtonBase focusRipple className="w-[72px] h-full rounded-[20px] bg-primary flex justify-center items-center cursor-pointer">
        <img
          src={search}
          alt="search"
          className="w-[15px] h-[15px] object-contain"
        />
      </ButtonBase>
    </form>
  );
};

export default React.memo(Search);