import { range } from "lodash-es";
import PropTypes from "prop-types";
import * as React from "react";
import * as fromUtils from './utils'
import type {
  EventPreview,
  DayColumnPreview,
  Event,
  HoursList,
  HourPreview,
  TimeTable,
  EventsList
} from './types'
import {
  differenceInMinutes,
  format
} from 'date-fns'
// @ts-expect-error
import classNames from "./styles.module.css";
import { DEFAULT_HOURS_INTERVAL } from "./constants";

export const HourPreviewJSX: React.FC<HourPreview> = ({ hour, defaultAttributes }) => (
  <div {...defaultAttributes}>
    {hour}
  </div>
);


export const EventPreviewJSX: React.FC<EventPreview> = ({
  event,
  defaultAttributes,
  classNames,
}) => {
  return (
    <div {...defaultAttributes} style={{
      ...defaultAttributes.style,
      background: event.type === "COMPLETE" ? "#66B266" : event.type === "CANCELLED" ? "#FF0000" : 'GOLD',
    }} title={event.name} data-starttime={format(event.startTime, "hh:mm")} data-endtime={format(event.endTime, "hh:mm")}>
      <>
          <span className={classNames.event_info} >{event.name}</span>
          <span className={classNames.event_info}>{event.vehicle}</span>
          <span className={classNames.event_info}>{event.city}</span>
          <span className={classNames.event_info}>
            {format(event.startTime, "hh:mm")} - {format(event.endTime, "hh:mm")}
          </span>
          </>
    </div>
  );
};

type RenderEventsListItem = Omit<EventsList, 'events'> & {
  events: Event[]
}

const renderEventsListItem = ({ events, renderEvent, hoursInterval, rowHeight, day }: RenderEventsListItem) => events.map((event, i) => {
  const intersects = event?.hasIntersection ?? false
  const left = intersects ? `12%` : 0
  console.log(left)
  let styles = {
    width: events?.hasIntersection ? `calc(100% / ${events.length})` : '100%',
    left: left,
    border: '2px solid white',
    borderColor: intersects ? 'red' : 'white',
    ...fromUtils.getEventPositionStyles({ event, hoursInterval, rowHeight })
  }

  return renderEvent({
    event,
    key: i + event.id + event.vehicle,
    defaultAttributes: {
      className: `${differenceInMinutes(event.endTime, event.startTime) < 30 ? classNames.event_small : classNames.event}`,
      style: styles
    },
    classNames,
  })
})

/**
 * A calendar timeslot on the item.
 */
export const EventsListJSX = ({
  events,
  day,
  renderEvent,
  ...props
}: EventsList) => {
  if (day === 'UNASSIGNED') {
    const intersectingEvents = fromUtils.getOverlaps(fromUtils.sortEvents(events[day]))
    intersectingEvents.flatMap(events => {
      if (intersectingEvents.length >= 1) {
        return renderEventsListItem({ events: events, renderEvent, day, ...props })
      }
    })
  }
  if (events[day].length > 0) {
    return renderEventsListItem({ events: events[day], renderEvent, day, ...props })
  }
}

const DayColumnPreviewJSX = ({
  events,
  day,
  index,
  rowHeight,
  getDayLabel,
  renderEvent,
  hoursInterval,
}: DayColumnPreview) => (
  <div
    className={`${classNames.day} ${day}`}
    style={{
      backgroundSize: `1px ${2 * rowHeight}%`,
      width: `calc((100% - 5rem) / ${Object.keys(events).length})`,
    }}
  >
    <div className={classNames.day_title} style={{ height: `57px`, }}>
      {getDayLabel(day)}
    </div>
    {EventsListJSX({
      events,
      day,
      renderEvent,
      hoursInterval,
      rowHeight,
    })}
  </div>
);

export const HoursListJSX = ({
  hoursInterval,
  rowHeight,
  renderHour,
}: HoursList) => {
  return range(hoursInterval.from, hoursInterval.to).map((hour: number, i) =>
    renderHour({
      key: hour + i,
      hour: `${hour > 12 ? hour - 12 : hour}:00`,
      defaultAttributes: {
        className: classNames.hour,
        style: { height: `${rowHeight}%` },
      },
      classNames,
    })
  );
};


export const TimeTableJSX = ({
  events,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = "Time",
  getDayLabel = fromUtils.getDefaultDayLabel,
  renderEvent = EventPreviewJSX,
  renderHour = HourPreviewJSX,
}: TimeTable) => {
  const [rowHeight, setRowHeight] = React.useState<number>(0);

  React.useEffect(() => {
    setRowHeight(fromUtils.getRowHeight(hoursInterval.from, hoursInterval.to));
  }, [hoursInterval]);

  return (
    <div className={classNames.time_table_wrapper}>
      <div className={classNames.time}>
        <div
          className={classNames.time_label}
          style={{ height: `57px` }}
        >
          {timeLabel}
        </div>
        {HoursListJSX({ hoursInterval, renderHour, rowHeight })}
      </div>
      {Object.keys(events).map((day, index) =>
        DayColumnPreviewJSX({
          key: day + index,
          events,
          day,
          index,
          rowHeight,
          getDayLabel,
          renderEvent,
          hoursInterval,
        })
      )}
    </div>
  );
};

TimeTableJSX.propTypes = {
  events: PropTypes.object.isRequired,
  hoursInterval: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }),
  renderHour: PropTypes.func,
  renderEvent: PropTypes.func,
  getDayLabel: PropTypes.func,
  timeLabel: PropTypes.string,
};

TimeTableJSX.defaultProps = {
  hoursInterval: DEFAULT_HOURS_INTERVAL,
  timeLabel: "Time",
  renderHour: HourPreviewJSX,
  renderEvent: EventPreviewJSX,
  getDayLabel: fromUtils.getDefaultDayLabel,
};

export default TimeTableJSX;
