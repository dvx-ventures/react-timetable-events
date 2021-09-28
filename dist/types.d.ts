import { DEFAULT_HOURS_INTERVAL } from "./constants";
export interface EventPreview {
    event: Event;
    classNames: ClassNames;
}
export declare type ClassNames = {
    time_table_wrapper: string;
    day: string;
    day_title: string;
    hour: string;
    event: string;
    event_info: string;
    event_small: string;
};
export interface Event {
    id: number | string;
    name: string;
    startTime: Date;
    endTime: Date;
    city: string;
    durationInMinutes: number;
    vehicle: string;
    type: string;
    [key: string]: unknown;
}
export interface Events {
    [day: string]: Event[];
}
export interface TimeTable {
    events: Events;
    hoursInterval?: typeof DEFAULT_HOURS_INTERVAL;
    timeLabel?: string;
    getDayLabel?: (day: string) => JSX.Element | string;
    onEventClick(event: Event | EventWithIntersection): void;
    renderEvent?: (event: Event | EventWithIntersection) => JSX.Element;
}
export interface HoursList {
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
}
export interface DayColumnPreview {
    events: Events;
    day: string;
    index: number;
    rowHeight: number;
    getDayLabel: (day: string) => JSX.Element | string;
    onEventClick(event: Event | EventWithIntersection): void;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    renderEvent: (event: Event | EventWithIntersection) => JSX.Element;
}
export declare type EventWithIntersection = Event & {
    hasIntersection?: boolean;
};
