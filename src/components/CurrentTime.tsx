import React from "react";
import { DEFAULT_HOURS_INTERVAL } from "../constants";
import classNames from "../styles.module.css";
import { getCurrentTimePosition } from "../utils";

export const CurrentTime: React.FC<{
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
}> = ({ hoursInterval, rowHeight }) => {
  const [topPosition, setTopPosition] = React.useState<number | undefined>();

  React.useEffect(() => {
    setTopPosition(getCurrentTimePosition({ hoursInterval, rowHeight }));
    const interval = setInterval(() => {
      setTopPosition(getCurrentTimePosition({ hoursInterval, rowHeight }));
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, [hoursInterval, rowHeight]);

  return topPosition !== undefined ? (
    <div
      className={classNames.time_current}
      style={{ top: `${topPosition}px` }}
    ></div>
  ) : null;
};
