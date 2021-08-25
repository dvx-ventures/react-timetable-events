import { Event } from './types';
import { DEFAULT_HOURS_INTERVAL } from "./constants";
export declare const getTime: (date: Date) => number;
export declare const haveOverlap: (a: Event, b: Event) => boolean;
export declare const countOverlaps: (event: Event) => (childAcc: number, comparitorEvent: Event) => number;
export declare const sortEvents: (events: Event[]) => Event[];
export declare const getOverlaps: (events: Event[]) => Event[][];
export declare const getUnassignedEventStyles: (events: Event[], i: number) => {
    width: string;
    left: string;
};
export declare const getRowHeight: (from: number, to: number) => number;
export declare const getDefaultDayLabel: (day: string) => string;
export declare const getEventPositionStyles: ({ event, hoursInterval, rowHeight, }: {
    event: Event;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
}) => {
    height: string;
    marginTop: string;
};
