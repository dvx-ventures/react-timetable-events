import React from "react";
import { Events, Event } from "../types";
import { DEFAULT_HOURS_INTERVAL } from "../constants";
export interface EventsList {
    day: string;
    events: Events;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
    onEventClick(event: Event): void;
}
export declare const EventsList: React.FC<EventsList>;
