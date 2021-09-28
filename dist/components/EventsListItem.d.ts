import React from "react";
import type { HoursList, EventWithIntersection } from "../types";
declare type EventsListItem = HoursList & {
    onEventClick(event: Event | EventWithIntersection): void;
    events: EventWithIntersection[];
    event: EventWithIntersection;
    index: number;
    renderEvent(event: Event | EventWithIntersection): JSX.Element;
};
export declare const EventsListItem: React.FC<EventsListItem>;
export {};
