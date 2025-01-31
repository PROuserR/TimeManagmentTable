import useToggleStore from "@/app/store";
import { detectOverlapping } from "@/const/helper_functions";
import { workTimeType } from "@/const/my_types";

type TimeDialogDataProps = {
  day: string;
  workTime: workTimeType
};

const TimeDialog = ({ day, workTime }: TimeDialogDataProps) => {
  const { setToggleStatus, setData, data } = useToggleStore();

  const updateTime1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    workTime.from = {
      hour: e.target.value.split(":")[0],
      minute: e.target.value.split(":")[1],
    };
    workTime.workState = "Edited";

    for (let index = 0; index < data.length; index++) {
      if (data[index].day === day)
        for (let j = 0; j < data[index].workTimes.length; j++) {
          if (data[index].workTimes[j].id === workTime.id) {
            data[index].workTimes[j] = workTime;
          }
        }
    }

    const time1 = `${workTime.from.hour}:${workTime.from.minute}`;
    const time2 = `${workTime.to.hour}:${workTime.to.minute}`;
    for (let index = 0; index < data.length; index++) {
      if (data[index].day === day)
        for (let j = 0; j < data[index].workTimes.length; j++) {
          if (data[index].workTimes[j].id != workTime.id) {
            const time3 = `${data[index].workTimes[j].from.hour}:${data[index].workTimes[j].from.minute}`;
            const time4 = `${data[index].workTimes[j].to.hour}:${data[index].workTimes[j].to.minute}`;
            const result = detectOverlapping(time1, time2, time3, time4);

            data[index].workTimes[j].isOverlapping = result;
            const currentIndex = data[index].workTimes.indexOf(workTime);
            data[index].workTimes[currentIndex].isOverlapping = result;
            break;
          }
        }
    }

    setData(data);
    setToggleStatus(1);
  };

  const updateTime2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    workTime.to = {
      hour: e.target.value.split(":")[0],
      minute: e.target.value.split(":")[1],
    };
    workTime.workState = "Edited";

    for (let index = 0; index < data.length; index++) {
      if (data[index].day === day)
        for (let j = 0; j < data[index].workTimes.length; j++) {
          if (data[index].workTimes[j].id === workTime.id) {
            data[index].workTimes[j] = workTime;
          }
        }
    }

    const time1 = `${workTime.from.hour}:${workTime.from.minute}`;
    const time2 = `${workTime.to.hour}:${workTime.to.minute}`;
    for (let index = 0; index < data.length; index++) {
      if (data[index].day === day)
        for (let j = 0; j < data[index].workTimes.length; j++) {
          if (data[index].workTimes[j].id != workTime.id) {
            const time3 = `${data[index].workTimes[j].from.hour}:${data[index].workTimes[j].from.minute}`;
            const time4 = `${data[index].workTimes[j].to.hour}:${data[index].workTimes[j].to.minute}`;
            const result = detectOverlapping(time1, time2, time3, time4);

            data[index].workTimes[j].isOverlapping = result;
            const currentIndex = data[index].workTimes.indexOf(workTime);
            data[index].workTimes[currentIndex].isOverlapping = result;
            break;
          }
        }
    }

    setData(data);
    setToggleStatus(1);
  };

  const updateOnlineToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    workTime.isOnline = e.target.checked;
    workTime.workState = "Edited";

    for (let index = 0; index < data.length; index++) {
      if (data[index].day === day)
        for (let j = 0; j < data[index].workTimes.length; j++) {
          if (data[index].workTimes[j].id === workTime.id) {
            data[index].workTimes[j] = workTime;
          }
        }
    }
    setData(data);
    setToggleStatus(1);
  };

  return (
    <div>
      <input
        className="bg-transparent"
        type="time"
        onChange={updateTime1}
        value={`${workTime.from.hour}:${workTime.from.minute}`}
      />
      <span className="px-2">-</span>
      <input
        className="bg-transparent"
        type="time"
        onChange={updateTime2}
        value={`${workTime.to.hour}:${workTime.to.minute}`}
      />
      <span className="px-2">Online</span>
      <input
        type="checkbox"
        className={`mr-2 mt-2 h-3 w-8  appearance-none rounded-[0.4375rem] bg-gray-100 before:pointer-events-none before:absolute before:h-3 before:w-3 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-blue-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-slate-400 dark:after:bg-gray-50 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]`}
        onChange={updateOnlineToggle}
        checked={workTime.isOnline}
      />
    </div>
  );
};

export default TimeDialog;