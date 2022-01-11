import type { TimeTable, Event, EventWithIntersection } from "./types";
export declare type TimeTableEvent = EventWithIntersection | Event;
export declare const TimeTableJSX: ({ events, onEventClick, hoursInterval, timeLabel, getDayLabel, renderEvent, dayColumnSizes, onDayComunSizeChanged, showCurrentTime, }: TimeTable) => JSX.Element;
export default TimeTableJSX;
