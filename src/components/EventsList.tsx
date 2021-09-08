import React from "react";
import { Events, Event } from "../types";
import { DEFAULT_HOURS_INTERVAL } from "../constants";
import * as fromUtils from "../utils";
import { EventsListItem } from "./EventsListItem";

export interface EventsList {
  day: string;
  events: Events;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
  onEventClick(event: Event): void;
}

const isUnassigned = (day: string) => day === "UNASSIGNED";

export const EventsList: React.FC<EventsList> = ({ events, day, ...props }) => {
  const intersectingEvents = React.useMemo(() => {
    return fromUtils.getOverlaps(fromUtils.sortEvents(events[day]));
  }, [day]);

  return (
    <>
      {isUnassigned(day)
        ? intersectingEvents.flatMap((_events) => {
            return _events.map((event, i) => (
              <EventsListItem
                event={event}
                events={_events}
                index={i}
                key={`${day}-${i}-${event.name}`}
                {...props}
              />
            ));
          })
        : events[day].map((event, i) => (
            <EventsListItem
              event={event}
              events={events[day]}
              index={i}
              {...props}
              key={`${day}-${i}-${event.name}`}
            />
          ))}
    </>
  );
};
