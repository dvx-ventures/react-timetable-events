import { range } from "lodash";
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
  <div {...defaultAttributes} key={hour}>
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
    }} title={event.name} key={event.id}>
      {differenceInMinutes(event.endTime, event.startTime) < 30 ? <span className={classNames.event_info}>{event.name} ({format(event.startTime, 'hh:mm')})</span> :
        <>
          <span className={classNames.event_info}>{event.name}</span>
          {differenceInMinutes(event.endTime, event.startTime) >= 60 ? <span className={classNames.event_info}>{event.vehicle}</span> : ''}
          <span className={classNames.event_info}>{event.city}</span>
          <span className={classNames.event_info}>
            {format(event.startTime, "hh:mm")} - {format(event.endTime, "hh:mm")}
          </span>
        </>
      }
    </div>
  );
};

type RenderEventsListItem = Omit<EventsList, 'events'> & {
  events: Event[]
}

const renderEventsListItem = ({ events, renderEvent, hoursInterval, rowHeight, day }: RenderEventsListItem) => events.map((event, i) => {
  return renderEvent({
    event,
    defaultAttributes: {
      className: `${classNames.event} ${classNames.type}`,
      style: {
        ...(day === 'unassigned' ? fromUtils.getUnassignedEventStyles(events, i) : {}),
        ...fromUtils.getEventPositionStyles({ event, hoursInterval, rowHeight }),
      }
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
  if (day === 'unassigned') {
    const intersectingEvents = fromUtils.getOverlaps(fromUtils.sortEvents(events[day]))
    return (intersectingEvents || []).flatMap((events) => {
      if (events.length > 1) {
        return renderEventsListItem({ events, renderEvent, day, ...props })
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
    key={`${day}-${index}`}
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
  return range(hoursInterval.from, hoursInterval.to).map((hour) =>
    renderHour({
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
