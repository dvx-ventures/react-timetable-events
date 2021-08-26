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
}: DayColumnPreview) => {
  const { size, handler } = useResizable({
    minSize: 300,
    maxSize: 12000,
    size: 200,
    direction: "right",
  });

  const style = {
    "--day-col-size": `1px ${2 * rowHeight}%`,
    marginRight: "12px",
    width: size,
    height: `100%`,
  } as React.CSSProperties;

  return (
    <div className={`${classNames.day} ${day}`} style={style}>
      <div className={classNames.day_title} style={{ height: `57px` }}>
        {getDayLabel(day)}
      </div>
      <EventsList
        events={events}
        day={day}
        hoursInterval={hoursInterval}
        rowHeight={rowHeight}
      />
      <div
        onMouseDown={handler}
        onTouchStart={handler}
        className={classNames.resize_handler}
      ></div>
    </div>
  );
};
