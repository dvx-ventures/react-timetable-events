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

const COLORS: Record<string, string> = {
  ATTACH_REPAIR_ORDER: "#DC2127",
  ORDER_PARTS: "#FBD75B",
  RECEIVE_PARTS: "#FF887C",
  LOADS_PART: "#A4BDFC",
  READY: "#7AE7BF",
  EN_ROUTE: "#46D6DB",
  IN_PROGRESS: "#fff",
  READY_FOR_BILLING: "#51B749",
  BILLING_ISSUE: "#FFB878",
  COMPLETE: "#5484ED",
  CANCELLED: "#616161",
  NO_SHOW: "#FF8303",
};

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
        background: COLORS[event.type] ?? "#B74ED4",
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
