import React from "react";
import { Events } from "../types";
import { DEFAULT_HOURS_INTERVAL } from "../constants";
export interface EventsList {
    day: string;
    events: Events;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
}
export declare const EventsList: React.FC<EventsList>;
