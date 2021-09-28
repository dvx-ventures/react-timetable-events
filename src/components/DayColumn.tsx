import React from "react";
import classNames from "../styles.module.css";
import type { DayColumnPreview } from "../types";
import { EventsList } from "./EventsList";
import useResizable from "../hooks/use-resizable";

export const DayColumn: React.FC<DayColumnPreview> = ({
  events,
  day,
  rowHeight,
  getDayLabel,
  hoursInterval,
  onEventClick,
  renderEvent,
}: DayColumnPreview) => {
  const { size, handler } = useResizable({
    minSize: 100,
    maxSize: 12000,
    size: day === "UNASSIGNED" ? 300 : 200,
    direction: "right",
  });

  const style = {
    "--day-col-size": `1px ${2 * rowHeight}%`,
    marginRight: "12px",
    width: size,
    flex: `1 0 ${size}px`,
    height: `100%`,
  } as React.CSSProperties;

  return (
    <div className={`${classNames.day} ${day}`} style={style}>
      <div className={classNames.day_title} style={{ height: `85px` }}>
        {getDayLabel(day)}
      </div>
      <EventsList
        onEventClick={onEventClick}
        events={events}
        day={day}
        hoursInterval={hoursInterval}
        rowHeight={rowHeight}
        renderEvent={renderEvent}
      />
      <div
        onMouseDown={handler}
        onTouchStart={handler}
        className={classNames.resize_handler}
      ></div>
    </div>
  );
};
