import React from "react";
import { Events, Event, EventWithIntersection } from "../types";
import { DEFAULT_HOURS_INTERVAL } from "../constants";
export interface EventsList {
    day: string;
    events: Events;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
    onEventClick(event: Event): void;
    renderEvent(event: Event | EventWithIntersection): JSX.Element;
}
export declare const EventsList: React.FC<EventsList>;
