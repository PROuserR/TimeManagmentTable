type workTimeType = {
  id: number | string;
  isOnline: boolean;
  isOverlapping: boolean;
  workState: string| null| undefined;
  to: { hour: string| number; minute: string| number };
  from: { hour: string| number; minute: string| number };
};

type myDataType = {
  day: string;
  isWorkDay: boolean;
  workTimes: Array<workTimeType>;
};

export type { workTimeType, myDataType};