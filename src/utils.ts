import { Event, EventWithIntersection } from "./types";
import { DEFAULT_HOURS_INTERVAL } from "./constants";
import { round, upperCase } from "lodash-es";
import { setHours, setMinutes, differenceInMinutes } from "date-fns";

export const getTime = (date: Date) => date.getTime();

export const getEndTime = (date: Date) => {
  const _date = new Date(date);
  return getTime(new Date(_date.setMinutes(_date.getMinutes() - 1)));
};

export const haveOverlap = (a: Event, b: Event) => {
  return (
    (getTime(b.startTime) <= getTime(a.endTime) &&
      getEndTime(b.endTime) > getTime(a.startTime)) ||
    (getEndTime(b.endTime) <= getTime(a.startTime) &&
      getTime(b.startTime) > getEndTime(a.endTime))
  );
};

export const countOverlaps =
  (event: Event) => (acc: number, comparitorEvent: Event) => {
    const overlaps = haveOverlap(event, comparitorEvent);
    if (overlaps) acc++;
    return acc;
  };

export const sortEvents = (events: Event[]) =>
  events.sort((a, b) => getTime(a.startTime) - getTime(b.startTime));

const doesBelongToLastOverlap = (
  acc: Event[][],
  event: Event,
  groupIndex: number
) => {
  const group = acc[groupIndex];
  if (!group) {
    return false;
  }
  if (group.length && group[group.length - 1]) {
    if (haveOverlap(event, group[group.length - 1])) {
      return true;
    }
  }
  return false;
};

export const getOverlaps = (events: Event[]) => {
  let groupIndex = 0;
  return events.reduce((acc, event) => {
    if (doesBelongToLastOverlap(acc, event, groupIndex)) {
      acc[groupIndex].push({
        ...event,
        hasIntersection: true,
      });
      return acc;
    }
    groupIndex++;
    acc[groupIndex] = [];
    acc[groupIndex].push({
      ...event,
      hasIntersection: true,
    });

    return acc;
  }, [] as EventWithIntersection[][]);
};

export const getUnassignedEventStyles = (events: Event[], i: number) => ({
  width: `calc(100% / ${events.length})`,
  left: (i / events.length) * 100 + "%",
});

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
  const startOfDay = setMinutes(
    setHours(event.startTime, hoursInterval.from),
    0
  );

  const minutesFromStartOfDay = round(
    differenceInMinutes(event.startTime, startOfDay)
  );

  const minutes = round(differenceInMinutes(event.endTime, event.startTime));
  return {
    height: (minutes * rowHeight) / 60 + "%",
    marginTop: ((minutesFromStartOfDay * rowHeight) / 60 / 100) * 1500 + "px",
  };
};
