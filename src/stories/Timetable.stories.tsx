import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { EventPreview } from "./../types";
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
    UNASSIGNED: [
      {
        id: 1,
        name: "Paul Fulwyler",
        type: "SCHEDULED",
        startTime: new Date("2018-02-23T13:30:00"),
        endTime: new Date("2018-02-23T14:00:00"),
        city: 'San Francisco',
        vehicle: 'something'
      },
      {
        id: 2,
        name: "Paul Fulwyler",
        type: "SCHEDULED",
        startTime: new Date("2018-02-23T13:30:00"),
        endTime: new Date("2018-02-23T14:00:00"),
        city: 'San Francisco',
        vehicle: '2007 chevrolet corvette'
      },
      {
        id: 3,
        name: "Paul Fulwyler",
        type: "SCHEDULED",
        startTime: new Date("2018-02-23T14:30:00"),
        endTime: new Date("2018-02-23T15:00:00"),
        city: 'San Francisco',
        vehicle: '2007 chevrolet corvette'
      },
      {
        id: 4,
        name: "Paul Fulwyler",
        type: "SCHEDULED",
        startTime: new Date("2018-02-23T12:30:00"),
        endTime: new Date("2018-02-23T13:00:00"),
        city: 'San Francisco',
        vehicle: '2007 chevrolet corvette'
      },
      {
        id: 8,
        name: "Paul Fulwyler",
        type: "SCHEDULED",
        startTime: new Date("2018-02-23T12:30:00"),
        endTime: new Date("2018-02-23T13:45:00"),
        city: 'San Francisco',
        vehicle: '2007 chevrolet corvette'
      },
      {
        id: 9,
        name: "Paul Fulwyler",
        type: "SCHEDULED",
        startTime: new Date("2018-02-23T11:30:00"),
        endTime: new Date("2018-02-23T12:00:00"),
        city: 'San Francisco',
        vehicle: '2007 chevrolet corvette'
      },
    ],
    tuesday: [
      {
        id: 10,
        name: "Paul Fulwyler",
        type: "COMPLETE",
        startTime: new Date("2018-02-22T14:30:00"),
        endTime: new Date("2018-02-22T15:30:00"),
        city: 'San Francisco',
        vehicle: '2007 Toyota Camry'
      },
      {
        id: 11,
        name: "Paul Fulwyler",
        type: "CANCELLED",
        startTime: new Date("2018-02-22T16:30:00"),
        endTime: new Date("2018-02-22T17:30:00"),
        city: 'San Francisco',
        vehicle: '2007 Toyota Camry'
      },
    ],
    something: [{
      id: 11,
      name: "Paul Fulwyler",
      type: "CANCELLED",
      startTime: new Date("2018-02-22T16:30:00"),
      endTime: new Date("2018-02-22T17:30:00"),
      city: 'San Francisco',
      vehicle: '2007 Toyota Camry'
    },],
    wednesday: [],
    thursday: [],
    friday: [],
  },
  hoursInterval: { from: 6, to: 19 },
  timeLabel: "Time",
  getDayLabel: (day: string) => day.slice(0, 3),
};
     

export const Secondary = Template.bind({});
Secondary.storyName = 'Customized: `renderEvent` and `renderHour`'
Secondary.args = {
  ...Primary.args,
};
