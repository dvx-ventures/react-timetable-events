import React from "react";
import { format } from "date-fns";
import * as fromUtils from "../utils";
import classNames from "../styles.module.css";
import type { HoursList, EventWithIntersection } from "../types";

type EventsListItem = HoursList & {
  events: EventWithIntersection[];
  event: EventWithIntersection;
  index: number;
};

export const EventsListItem: React.FC<EventsListItem> = ({
  events,
  event,
  hoursInterval,
  rowHeight,
  index,
}) => {
  const style = React.useMemo(() => {
    const { height, marginTop } = fromUtils.getEventPositionStyles({
      event,
      hoursInterval,
      rowHeight,
    });
    const _style = { height, marginTop };
    if (event.hasIntersection) {
      const { width, left } = fromUtils.getUnassignedEventStyles(events, index);
      return {
        ..._style,
        width,
        left,
      };
    }
    return _style;
  }, [rowHeight]);

  console.log(event, index);
  return (
    <div
      style={{
        ...style,
        background:
          event.type === "COMPLETE"
            ? "#66B266"
            : event.type === "CANCELLED"
            ? "#FF0000"
            : "GOLD",
      }}
      className={`${classNames.event} ${classNames.type}`}
      title={event.name}
      data-starttime={format(event.startTime, "hh:mm")}
      data-endtime={format(event.endTime, "hh:mm")}
    >
      <>
        <span className={classNames.event_info}>{event.name}</span>
        <span className={classNames.event_info}>{event.vehicle}</span>
        <span className={classNames.event_info}>{event.city}</span>
        <span className={classNames.event_info}>
          {format(event.startTime, "hh:mm")} - {format(event.endTime, "hh:mm")}
        </span>
      </>
    </div>
  );
};
