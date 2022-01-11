import React from "react";
import { format } from "date-fns";
import * as fromUtils from "../utils";
import classNames from "../styles.module.css";
import type { HoursList, EventWithIntersection } from "../types";

type EventsListItem = HoursList & {
  onEventClick(event: Event | EventWithIntersection): void;
  events: EventWithIntersection[];
  event: EventWithIntersection;
  index: number;
  renderEvent(event: Event | EventWithIntersection): JSX.Element;
};

const getBackgroundColorByEventType = (type: string | undefined) =>
  type === "ATTACH_REPAIR_ORDER"
    ? "#DC2127"
    : type === "ORDER_PARTS"
    ? "#FBD75B"
    : type === "RECEIVE_PARTS"
    ? "#FF887C"
    : type === "LOADS_PARTS"
    ? "#A4BDFC"
    : type === "READY"
    ? "#7AE7BF"
    : type === "EN_ROUTE"
    ? "#46D6DB"
    : type === "IN_PROGRESS"
    ? "white"
    : type === "READY_FOR_BILLING"
    ? "#51B749"
    : type === "BILLING_ISSUE"
    ? "#FFB878"
    : type === "COMPLETE"
    ? "#5484ED"
    : type === "CANCELLED"
    ? "#616161"
    : "#B74ED4";

export const EventsListItem: React.FC<EventsListItem> = ({
  events,
  event,
  hoursInterval,
  rowHeight,
  index,
  onEventClick,
  renderEvent,
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
        borderBottom: "2px solid black",
        background: getBackgroundColorByEventType(event.type),
      }}
      className={`${classNames.event} ${classNames.type}`}
      title={event.name}
      data-starttime={format(event.startTime, "hh:mm")}
      data-endtime={format(event.endTime, "hh:mm")}
      onClick={() => onEventClick(event)}
    >
      {renderEvent(event)}
    </div>
  );
};
