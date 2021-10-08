import React from "react";
import { format, differenceInMinutes } from "date-fns";
import type { Event, EventWithIntersection } from "../types";
import classNames from "../styles.module.css";

export const DefaultEventLayout = (event: Event | EventWithIntersection) => (
  <>
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
  </>
);
