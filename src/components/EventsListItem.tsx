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
  type === "ATTACH_REPAIR_ORDER"
    ? "#DC2127"
    : "ORDER_PARTS"
    ? "#FBD75B"
    : "RECEIVE_PARTS"
    ? "#FF887C"
    : "LOADS_PARTS"
    ? "#A4BDFC"
    : "READY"
    ? "#7AE7BF"
    : "EN_ROUTE"
    ? "#46D6DB"
    : "WORKING"
    ? "White"
    : "READY_FOR_BILLING"
    ? "#51B749"
    : "BILLING_ISSUE"
    ? "#FFB878"
    : "COMPLETE"
    ? "#5484ED"
    : "CANCELLED"
    ? "#616161"
    : "NO_SHOW"
    ? "#B74ED4"
    : "#7AE7BF";

export const EventsListItem: React.FC<EventsListItem> = ({
  events,
  event,
  hoursInterval,
  rowHeight,
  index,
  onEventClick
}) => {
  const style = React.useMemo(() => {
    const { height, marginTop } = fromUtils.getEventPositionStyles({
      event,
      hoursInterval,
      rowHeight
    });
    const _style = { height, marginTop };
    if (event.hasIntersection) {
      const { width, left } = fromUtils.getUnassignedEventStyles(events, index);
      return {
        ..._style,
        width,
        left
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
        background: getBackgroundColorByEventType(event.type)
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
