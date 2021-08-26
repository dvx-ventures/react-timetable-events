import React from "react";
import classNames from "../styles.module.css";

export type HourPreview = {
  hour: number;
} & React.HTMLProps<HTMLDivElement>;

export const Hour: React.FC<HourPreview> = ({ hour, ...props }) => (
  <div className={classNames.hour} {...props}>
    {hour > 12 ? hour - 12 : hour}:00
  </div>
);
