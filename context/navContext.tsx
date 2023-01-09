import { useMounted } from "hooks/useMounted";
import React, { useCallback, useContext } from "react";
import { createContext, useState } from "react";

export type NavContextType = {
  expanded: boolean;
  mounted: boolean;
  mounting: boolean;
  toggleExpanded: () => void;
  setExpanded: (exp: boolean) => void;
};

const NavContext = createContext<NavContextType>({
  expanded: false,
  mounted: false,
  mounting: false,
  toggleExpanded: () => {},
  setExpanded: (exp: boolean) => {},
});

type Props = {
  children: React.ReactNode;
};

export const NavContextProvider = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted, mounting] = useMounted(false);

  const handleChange = useCallback(
    (val: boolean) => {
      const isChrome = navigator.userAgent.indexOf("Chrome") > 0;
      const visibleOverflow = isChrome ? "overlay" : "auto";
      document.body.style.overflow = val ? "hidden" : visibleOverflow;

      val ? setMounted(true) : setMounted(false, 200);
    },
    [setMounted]
  );

  const toggleExpandedHandler = useCallback(() => {
    const newExpanded = !expanded;
    handleChange(newExpanded);
    setExpanded(newExpanded);
  }, [handleChange, expanded]);

  const setExpandedHandler = useCallback((exp: boolean) => {
    handleChange(exp);
    setExpanded(exp);
  }, [handleChange]);

  const context = {
    expanded,
    mounted,
    mounting,
    toggleExpanded: toggleExpandedHandler,
    setExpanded: setExpandedHandler,
  };

  return (
    <NavContext.Provider value={context}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;

export const useNavContext = () => useContext(NavContext)