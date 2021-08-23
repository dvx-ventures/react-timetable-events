import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { EventPreview, HourPreview } from "./../types";
import { format } from 'date-fns'
import { TimeTableJSX } from "..";

export default {
  title: "Example/TimeTable",
  component: TimeTableJSX,
  argTypes: {
    events: {
      monday: [
        {
          id: 1,
          name: "Custom Event 1",
          type: "error",
          startTime: new Date("2018-02-23T11:30:00"),
          endTime: new Date("2018-02-23T13:30:00")
        },
      ],
      tuesday: [
        {
          id: 2,
          name: "Custom Event 2",
          type: "custom",
          startTime: new Date("2018-02-22T12:30:00"),
          endTime: new Date("2018-02-22T14:30:00")
        },
        {
          id: 3,
          name: "Custom Event 3",
          type: "custom",
          startTime: new Date("2018-02-22T16:30:00"),
          endTime: new Date("2018-02-22T18:45:00")
        },
      ],
      wednesday: [],
      thursday: [],
      friday: [],
    },
  },
} as ComponentMeta<typeof TimeTableJSX>;

const Template: ComponentStory<typeof TimeTableJSX> = (args: any) => (
  <TimeTableJSX {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  events: {
    monday: [
      {
        id: 1,
        name: "Paul Fulwyler",
        type: "COMPLETE",
        startTime: new Date("2018-02-23T11:30:00"),
        endTime: new Date("2018-02-23T11:50:00"),
        city: 'San Francisco',
        vehicle: 'something'
      },
    ],
    tuesday: [
      {
        id: 2,
        name: "Paul Fulwyler",
        type: "SCHEDULED",
        startTime: new Date("2018-02-22T12:30:00"),
        endTime: new Date("2018-02-22T13:30:00"),
        city: 'San Francisco',
        vehicle: '2007 Toyota Camry'
      },
      {
        id: 3,
        name: "Paul Fulwyler",
        type: "CANCELLED",
        startTime: new Date("2018-02-22T16:30:00"),
        endTime: new Date("2018-02-22T18:45:00"),
        city: 'San Francisco',
        vehicle: '2007 Toyota Camry'
      },
    ],
    wednesday: [],
    thursday: [],
    friday: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
  },
  hoursInterval: { from: 6, to: 19 },
  timeLabel: "Time",
  getDayLabel: (day: string) => day.slice(0, 3),
};

const HourPreviewJSX = ({ hour, defaultAttributes }: HourPreview) => {
  return (
    <div {...defaultAttributes} key={hour}>
      {hour}
    </div>
  );
};

const EventPreviewJSX = ({
  event,
  defaultAttributes,
  classNames,
}: EventPreview) => {
  return (
    <div
      {...defaultAttributes}
      style={{
        ...defaultAttributes.style,
        background: event.type === "error" ? "#720000" : "#66B266",
      }}
      title={event.name}
      key={event.id}
      className={`${classNames.event}`}
    >
      <span className={classNames.event_info}>[ {event.name} ]</span>
      <span className={classNames.event_info}>
        {format(event.startTime, "hh:mm")} - {format(event.endTime, "hh:mm")}
      </span>
    </div>
  );
};

export const Secondary = Template.bind({});
Secondary.storyName = 'Customized: `renderEvent` and `renderHour`'
Secondary.args = {
  ...Primary.args,
  renderEvent: EventPreviewJSX,
  renderHour: HourPreviewJSX,
};
