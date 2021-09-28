import React from "react";
import { Events, Event, EventWithIntersection } from "../types";
import { DEFAULT_HOURS_INTERVAL } from "../constants";
import * as fromUtils from "../utils";
import { EventsListItem } from "./EventsListItem";
import { nanoid } from "nanoid";

export interface EventsList {
  day: string;
  events: Events;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
  onEventClick(event: Event): void;
  renderEvent(event: Event | EventWithIntersection): JSX.Element;
}

export const EventsList: React.FC<EventsList> = ({ events, day, ...props }) => {
  const intersectingEvents = React.useMemo(() => {
    return fromUtils.getOverlaps(fromUtils.sortEvents(events[day]));
  }, [day]);

  return (
    <>
      {intersectingEvents.flatMap((_events) => {
        return _events.map((event, i) => (
          <EventsListItem
            event={event}
            events={_events}
            index={i}
            key={event.id + nanoid()}
            {...props}
          />
        ));
      })}
    </>
  );
};
