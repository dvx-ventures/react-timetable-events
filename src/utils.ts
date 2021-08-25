import { Event} from './types'
import { DEFAULT_HOURS_INTERVAL } from "./constants";
import { range, round, upperCase, groupBy } from "lodash";
import {
    setHours,
    setMinutes,
    differenceInMinutes,
    format,
    minutesToSeconds
  } from 'date-fns'

export const getTime = (date: Date) => date.getTime();

export const haveOverlap = (a: Event, b: Event) =>
  (getTime(b.startTime) <= getTime(a.endTime) &&
    getTime(b.endTime) > getTime(a.startTime)) ||
  (getTime(b.endTime) <= getTime(a.startTime) &&
    getTime(b.startTime) > getTime(a.endTime));

export const countOverlaps = (event: Event) => (childAcc: number, comparitorEvent: Event) => {
  if (haveOverlap(event, comparitorEvent)) childAcc++;
  return childAcc;
};

export const sortEvents = (events: Event[]) => events.sort((a, b) => getTime(a.startTime) - getTime(b.startTime))

export const getOverlaps = (events: Event[]) => {
  let groupIndex = 0;
  return events.reduce((acc, event) => {
    const overlapCount = events.reduce(countOverlaps(event), 0);
    if (overlapCount > 1) {
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(event);
    } else {
      groupIndex++;
      acc[groupIndex] = [event];
    }
    return acc;
  }, [] as Event[][]);
};

export const getUnassignedEventStyles = (events: Event[], i: number) => ({
  width: `calc(100% / ${events.length})`,
  left: i / events.length * 100 + '%'
})

export const getRowHeight = (from: number, to: number) => {
    const numberOfRows = to - from + 1;
  
    return round(100 / numberOfRows, 5);
  };
  
  export const getDefaultDayLabel = (day: string) => upperCase(day);
  
  export const getEventPositionStyles = ({
    event,
    hoursInterval,
    rowHeight,
  }: {
    event: Event;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
  }) => {
    let startOfDay = setMinutes(setHours(event.startTime, hoursInterval.from), 0)
  
    let minutesFromStartOfDay = round(
      differenceInMinutes(event.startTime, startOfDay)
    );
  
    let minutes = round(differenceInMinutes(event.endTime, event.startTime));
    console.log(((minutesFromStartOfDay * rowHeight) / 60) / 100 + "%")
    return {
      height: (minutes * rowHeight) / 60 + "%",
      marginTop: ((minutesFromStartOfDay * rowHeight) / 60) / 100 * 1500 + "px",
    };
  };
  