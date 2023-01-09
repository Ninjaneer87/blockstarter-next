import { ButtonBase } from '@mui/material';
import React from 'react';
import { FormEventHandler } from 'react';

const search = '../../img/search.svg';

const Search = () => {
  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Search Submitted');
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="hidden lg:flex flex-1 flex-row max-w-[450px] py-2 pl-4 pr-2 h-[51px] bg-glass rounded-full"
    >
      <input
        type="text"
        placeholder="Search for campaigns"
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

export default Search;