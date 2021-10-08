import { range } from "lodash-es";
import * as React from "react";
import * as fromUtils from "./utils";
import type { TimeTable, Event, EventWithIntersection } from "./types";
import * as fromComponents from "./components";
import classNames from "./styles.module.css";
import { DEFAULT_HOURS_INTERVAL } from "./constants";
import { DayColumn } from "./components";
import { nanoid } from "nanoid";

export type TimeTableEvent = EventWithIntersection | Event;

export const TimeTableJSX = ({
  events,
  onEventClick,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = "Time",
  getDayLabel = fromUtils.getDefaultDayLabel,
  renderEvent = fromComponents.DefaultEventLayout,
}: TimeTable) => {
  const [rowHeight, setRowHeight] = React.useState<number>(0);

  React.useEffect(() => {
    setRowHeight(fromUtils.getRowHeight(hoursInterval.from, hoursInterval.to));
  }, [hoursInterval]);

  return (
    <div className={classNames.time_table_wrapper}>
      <div className={classNames.time}>
        <div className={classNames.time_label} style={{ height: `85px` }}>
          {timeLabel}
        </div>
        {range(hoursInterval.from, hoursInterval.to).map((hour: number) => (
          <fromComponents.Hour
            hour={hour}
            key={`${hour}-${nanoid()}`}
            style={{ height: `${rowHeight}%` }}
          />
        ))}
      </div>
      {Object.keys(events).map((day, index) => (
        <DayColumn
          onEventClick={onEventClick}
          key={day + nanoid()}
          events={events}
          day={day}
          index={index}
          rowHeight={rowHeight}
          getDayLabel={getDayLabel}
          hoursInterval={hoursInterval}
          renderEvent={renderEvent}
        />
      ))}
    </div>
  );
};

export default TimeTableJSX;
