export const DayOfWeekEnum = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;
export type DayOfWeek = (typeof DayOfWeekEnum)[keyof typeof DayOfWeekEnum];

interface ITimeFromTo {
  hour: number;
  minute: number;
}

interface IWorkTime {
  id: number;
  from: ITimeFromTo;
  to: ITimeFromTo;
  isOnline: boolean;
}

interface IUserWorkSiteDay {
  day: DayOfWeek;
  isWorkDay: boolean;
  workTimes: IWorkTime[];
}

const days: IUserWorkSiteDay[] = [
  {
    day: 0,
    isWorkDay: true,
    workTimes: [
      {
        id: 10,
        from: {
          hour: 10,
          minute: 15,
        },
        to: {
          hour: 10,
          minute: 45,
        },
        isOnline: false,
      },
      {
        id: 62,
        from: {
          hour: 13,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 0,
        },
        isOnline: false,
      },
    ],
  },
  {
    day: 1,
    isWorkDay: false,
    workTimes: [
      {
        id: 11,
        from: {
          hour: 10,
          minute: 15,
        },
        to: {
          hour: 11,
          minute: 15,
        },
        isOnline: false,
      },
      {
        id: 93,
        from: {
          hour: 13,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 0,
        },
        isOnline: false,
      },
    ],
  },
  {
    day: 2,
    isWorkDay: true,
    workTimes: [
      {
        id: 46,
        from: {
          hour: 10,
          minute: 15,
        },
        to: {
          hour: 11,
          minute: 15,
        },
        isOnline: false,
      },
      {
        id: 106,
        from: {
          hour: 13,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 0,
        },
        isOnline: true,
      },
    ],
  },
  {
    day: 3,
    isWorkDay: true,
    workTimes: [
      {
        id: 63,
        from: {
          hour: 13,
          minute: 15,
        },
        to: {
          hour: 14,
          minute: 15,
        },
        isOnline: false,
      },
      {
        id: 94,
        from: {
          hour: 13,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 0,
        },
        isOnline: true,
      },
    ],
  },
  {
    day: 4,
    isWorkDay: true,
    workTimes: [
      {
        id: 48,
        from: {
          hour: 13,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 0,
        },
        isOnline: false,
      },
    ],
  },
  {
    day: 5,
    isWorkDay: true,
    workTimes: [
      {
        id: 77,
        from: {
          hour: 13,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 0,
        },
        isOnline: false,
      },
    ],
  },
  {
    day: 6,
    isWorkDay: true,
    workTimes: [
      {
        id: 49,
        from: {
          hour: 13,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 0,
        },
        isOnline: false,
      },
      {
        id: 50,
        from: {
          hour: 12,
          minute: 0,
        },
        to: {
          hour: 13,
          minute: 0,
        },
        isOnline: false,
      },
      {
        id: 107,
        from: {
          hour: 10,
          minute: 15,
        },
        to: {
          hour: 11,
          minute: 15,
        },
        isOnline: true,
      },
    ],
  },
];
export default days;