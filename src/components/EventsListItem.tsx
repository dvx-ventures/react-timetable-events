import React from "react";
import { format, differenceInMinutes } from "date-fns";
import * as fromUtils from "../utils";
import classNames from "../styles.module.css";
import type { HoursList, EventWithIntersection } from "../types";

type EventsListItem = HoursList & {
  onEventClick(event: Event | EventWithIntersection): void;
  events: EventWithIntersection[];
  event: EventWithIntersection;
  index: number;
};

const getBackgroundColorByEventType = (type: string | undefined) =>
  type === "SCHEDULED"
    ? "rgb(208 208 208)"
    : type === "CANCELLED"
    ? "rgb(255 105 105)"
    : "rgb(119 224 123)";

export const EventsListItem: React.FC<EventsListItem> = ({
  events,
  event,
  hoursInterval,
  rowHeight,
  index,
  onEventClick,
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

  return (
    <div
      style={{
        ...style,
        zIndex: 1,
        borderLeft: "6px solid #458ebb",
        background: getBackgroundColorByEventType(event.type),
      }}
      className={`${classNames.event} ${classNames.type}`}
      title={event.name}
      data-starttime={format(event.startTime, "hh:mm")}
      data-endtime={format(event.endTime, "hh:mm")}
      onClick={() => onEventClick(event)}
    >
      <span className={classNames.event_info}>{event.name}</span>
      {differenceInMinutes(event.endTime, event.startTime) > 30 ? (
        <span className={classNames.event_info}>{event.vehicle}</span>
      ) : (
        ""
      )}
      {differenceInMinutes(event.endTime, event.startTime) > 20 ? (
        <span className={classNames.event_info}>{event.city}</span>
      ) : (
        ""
      )}
      <span className={classNames.event_info}>
        {format(event.startTime, "hh:mm")} - {format(event.endTime, "hh:mm")}
      </span>
    </div>
  );
};
