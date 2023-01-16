import { ButtonBase } from '@mui/material';
import { useNavContext } from 'context/navContext';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import { FormEventHandler } from 'react';

const search = '/img/search.svg';

const Search = () => {
  const { setExpanded } = useNavContext();
  const { asPath ,pathname, push, query } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setExpanded(false);
    if (!searchQuery && pathname !== '/campaigns') return;

    let newQuery: ParsedUrlQuery = { ...query, search: searchQuery };
    if (!searchQuery) {
      const { search, ...restQuery } = query;
      newQuery = restQuery;
    }

    push({
      pathname: '/campaigns',
      query: newQuery,
    });
  }

  useEffect(() => {
    if (!pathname.startsWith('/campaigns')) setSearchQuery('')
    else if(query?.search) setSearchQuery(query.search as string)
  }, [asPath, pathname, query])

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full py-2 pl-4 pr-2 h-[51px] bg-glass rounded-full mx-auto shrink-0"
    >
      <input
        type="text"
        placeholder="Find campaigns"
        className="w-full text-sm placeholder:text-placeholder bg-transparent outline-none border-none text-themed-text"
        spellCheck={false}
        onChange={e => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <ButtonBase type='submit' focusRipple className="w-[72px] h-full rounded-[20px] bg-primary flex justify-center items-center cursor-pointer">
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