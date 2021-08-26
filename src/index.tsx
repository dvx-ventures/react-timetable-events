import { range } from "lodash-es";
import * as React from "react";
import * as fromUtils from "./utils";
import type { TimeTable } from "./types";
import * as fromComponents from "./components";
import classNames from "./styles.module.css";
import { DEFAULT_HOURS_INTERVAL } from "./constants";
import { DayColumn } from "./components";

export const TimeTableJSX = ({
  events,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = "Time",
  getDayLabel = fromUtils.getDefaultDayLabel,
}: TimeTable) => {
  const [rowHeight, setRowHeight] = React.useState<number>(0);

  React.useEffect(() => {
    setRowHeight(fromUtils.getRowHeight(hoursInterval.from, hoursInterval.to));
  }, [hoursInterval]);

  return (
    <div className={classNames.time_table_wrapper}>
      <div className={classNames.time}>
        <div className={classNames.time_label} style={{ height: `57px` }}>
          {timeLabel}
        </div>
        {range(hoursInterval.from, hoursInterval.to).map((hour: number) => (
          <fromComponents.Hour
            hour={hour}
            key={`${hour}-${Math.random() * 10000}`}
            style={{ height: `${rowHeight}%` }}
          />
        ))}
      </div>
      {Object.keys(events).map((day, index) => (
        <DayColumn
          key={day + index}
          events={events}
          day={day}
          index={index}
          rowHeight={rowHeight}
          getDayLabel={getDayLabel}
          hoursInterval={hoursInterval}
        />
      ))}
    </div>
  );
};

export default TimeTableJSX;
