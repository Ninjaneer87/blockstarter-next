import React, { useEffect, useState } from "react";
import ClientOnlyPortal from "@/components/portals/ClientOnlyPortal";
import classes from "./MyLoader.module.scss";
import WidgetsIcon from '@mui/icons-material/Widgets';



const MyLoader = () => {
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
      setTimeout(() => setLoaded(true), 1000);
      setTimeout(() => setRemoved(true), 2500);
  }, []);

  return (
    <ClientOnlyPortal>
      {removed ? null : (
        <div className={classes.loader}>
          <div className={`${classes.loader1} ${loaded ? "exit-left" : ""}`} />
          <div className={`${classes.loader2} ${loaded ? "exit-right" : ""}`}>
              <div className={classes.logoHolder}>
            <div className="gradient-wrapper w-[250px] h-[250px] flex items-center justify-center rounded-full">
                <WidgetsIcon fontSize="large" color="primary" className="scale-[3] appear pulse" />
            </div>
              </div>
          </div>
        </div>
      )}
    </ClientOnlyPortal>
  );
};

export default MyLoader;
