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
      "UNASSIGNED": [
          {
              "id": "apt_HOeKoPxLTDeckDdcKVCttQ",
              "name": "Peter Chapman",
              "startTime": new Date("2021-08-25T15:30:00.000Z"),
              "endTime": "2021-08-25T16:00:00.000Z",
              "city": "Cupertino",
              "type": "SCHEDULED",
              "vehicle": "2007 Lamborghini Murcielago LP640"
          },
        ]
  },
}
} as ComponentMeta<typeof TimeTableJSX>;

const Template: ComponentStory<typeof TimeTableJSX> = (args: any) => (
  <TimeTableJSX {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  events: {
    "UNASSIGNED": [
        {
            "id": "apt_HOeKoPxLTDeckDdcKVCttQ",
            "name": "Peter Chapman",
            "startTime": new Date("2021-08-25T15:30:00.000Z"),
            "endTime": new Date( "2021-08-25T16:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2007 Lamborghini Murcielago LP640"
        },
        {
            "id": "apt_d7iz3sCBQj2J3rDBRcOYyQ",
            "name": "sdf dfg",
            "startTime": new Date("2021-08-25T16:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2002 Infiniti G20"
        },
        {
            "id": "apt_Fb_bt9LZSgCsUqftLltHeg",
            "name": "Peterii Chappy",
            "startTime": new Date("2021-08-25T16:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2015 Cadillac CTS"
        },
        {
            "id": "apt_QKX-Y-UTSBK1K-Wiln3x3w",
            "name": "p c",
            "startTime": new Date("2021-08-25T16:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2018 Honda CBR600RR"
        },
        {
            "id": "apt_vPyShNP3RkOJzD7hAnHs4A",
            "name": "Peter Chapman dfs",
            "startTime": new Date("2021-08-25T16:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2002 Infiniti G20"
        },
        {
            "id": "apt_aYwR3fugS6KFDUHLW6LO6w",
            "name": "dsf sdf",
            "startTime": new Date("2021-08-25T17:30:00.000Z"),
            "endTime": new Date("2021-08-25T18:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2002 Infiniti G20"
        },
        {
            "id": "apt_vF2yabZ0Sw6aqPNdLuODmA",
            "name": "Peter Chapman",
            "startTime": new Date("2021-08-25T17:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:50:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2019 BMW 6-Series Gran Coupe"
        },
        {
            "id": "apt_2vlG9QB4R-SYbVV-KNvgeg",
            "name": "E M",
            "startTime": new Date("2021-08-25T19:15:00.000Z"),
            "endTime": new Date("2021-08-25T19:45:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "1998 Toyota Camry"
        },
        {
            "id": "apt_9df0LXhyReqeSFHEXBwUEQ",
            "name": "Evan Motte",
            "startTime": new Date("2021-08-25T19:15:00.000Z"),
            "endTime": new Date("2021-08-25T19:45:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "1998 Toyota Camry"
        },
        {
            "id": "apt_wYSExhLhRwSsXtWdBEakNA",
            "name": "erewr wrwer",
            "startTime": new Date("2021-08-25T19:15:00.000Z"),
            "endTime": new Date("2021-08-25T19:40:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "erewr's Car"
        }
    ],
    "BU1": [
        {
            "id": "apt_8QAil4QzQBSl7QFPn7-vkA",
            "name": "Flavia Oni",
            "startTime": new Date("2021-08-25T16:00:00.000Z"),
            "endTime": new Date("2021-08-25T16:25:00.000Z"),
            "city": "Menlo Park",
            "type": "CANCELLED",
            "vehicle": "1998 Toyota Camry"
        },
        {
            "id": "apt_Gov4v_IQRQKhSLdlydm2UQ",
            "name": "Jay Kariesc",
            "startTime": new Date("2021-08-25T16:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:00:00.000Z"),
            "city": "Cupertino",
            "type": "CANCELLED",
            "vehicle": "2014 Lexus CT 200h"
        }
    ],
    "BU2": [
        {
            "id": "apt_UboxT2CwTmus6Tb28N6c0A",
            "name": "Elena Cristea",
            "startTime": new Date("2021-08-25T14:45:00.000Z"),
            "endTime": new Date("2021-08-25T15:10:00.000Z"),
            "city": "San Francisco",
            "type": "NO_SHOW",
            "vehicle": "Elena's Car"
        }
    ],
    "BU3": [
        {
            "id": "apt_2oPETEeHTnW55OxObJsaFQ",
            "name": "sdf sdf",
            "startTime": new Date("2021-08-25T16:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "sdf's Car"
        }
    ],
    "BU4": [
        {
            "id": "apt_sElPZVPfQp2TyUz46bxCug",
            "name": "Peter Chapman",
            "startTime": new Date("2021-08-25T15:30:00.000Z"),
            "endTime": new Date("2021-08-25T16:00:00.000Z"),
            "city": "Cupertino",
            "type": "SCHEDULED",
            "vehicle": "2002 Infiniti G20"
        }
    ],
    "BU5": [],
    "BU6": [],
    "BU7": [],
    "BU8": [],
    "SU1": [
        {
            "id": "apt_FC9SPDvMT5S9p6pxMc8drg",
            "name": "Zoe-Maria Miclaus",
            "startTime": new Date("2021-08-25T14:30:00.000Z"),
            "endTime": new Date("2021-08-25T17:27:00.000Z"),
            "city": "Redwood City",
            "type": "COMPLETE",
            "vehicle": "2012 Honda CR-V"
        },
        {
            "id": "apt_0Yo3BmtDRhCSMBxuxAoXsg",
            "name": "Zoe-Maria Miclaus",
            "startTime": new Date("2021-08-25T15:30:00.000Z"),
            "endTime": new Date("2021-08-25T16:15:00.000Z"),
            "city": "Redwood City",
            "type": "SCHEDULED",
            "vehicle": "2016 Ford Shelby GT350"
        },
        {
            "id": "apt_moVkXU8QTriC_W_xYId-_w",
            "name": "Zoe-Maria Miclaus",
            "startTime": new Date("2021-08-25T16:45:00.000Z"),
            "endTime": new Date("2021-08-25T17:30:00.000Z"),
            "city": "Redwood City",
            "type": "SCHEDULED",
            "vehicle": "2006 Lexus IS"
        }
    ],
    "TV1": []
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
