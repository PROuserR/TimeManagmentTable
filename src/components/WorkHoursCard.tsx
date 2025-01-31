"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useToggleStore from "@/app/store";
import TimeDialog from "./TimeDialog";
import { detectOverlapping } from "@/const/helper_functions";
import { workTimeType } from "@/const/my_types";

type WorkHoursCardDataProps = {
  currentDay: string;
  workTimes: Array<workTimeType>;
};

const WorkHoursCard = ({ currentDay, workTimes }: WorkHoursCardDataProps) => {
  const { toggleStatus, setToggleStatus, data, setData } = useToggleStore();

  const formatTime = (workTime : workTimeType) => {
    if (
      String(workTime.to.minute) == "0" &&
      String(workTime.from.minute) == "0"
    ) {
      workTime.from.minute = `${workTime.from.minute}0`;
      workTime.to.minute = `${workTime.to.minute}0`;
    } else if (String(workTime.to.minute) == "0") {
      workTime.to.minute = `${workTime.to.minute}0`;
    } else if (String(workTime.from.minute) == "0") {
      workTime.from.minute = `${workTime.from.minute}0`;
    }

    return workTime;
  };

  const getWorkTimesArray = () => {
    let currentDayWorkTimes:workTimeType[] = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index]?.day === currentDay) {
        currentDayWorkTimes = data[index]?.workTimes;
      }
    }
    return [...workTimes, ...currentDayWorkTimes];
  };

  const [workTimesArray, setWorkTimesArray] = useState<workTimeType[]>(
    getWorkTimesArray() || []
  );

  const deleteAppointment = (id: string | number) => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].day === currentDay)
        for (let j = 0; j < data[index].workTimes.length; j++) {
          if (data[index].workTimes[j].id === id) {
            data[index].workTimes.splice(
              data[index].workTimes.indexOf(data[index].workTimes[j]),
              1
            );
            setData(data);
            setToggleStatus(1);
            return;
          }
        }
    }
  };

  const addDefaultWorkHours = () => {
    const newWorkTime = formatTime({
      id: workTimesArray.length + 1,
      from: {
        hour: 12,
        minute: 0,
      },
      to: {
        hour: 12,
        minute: 30,
      },
      isOnline: false,
      workState: "New",
      isOverlapping: false,
    });

    setWorkTimesArray([...workTimesArray, newWorkTime]);
    setToggleStatus(1);

    const time1 = `${newWorkTime.from.hour}:${newWorkTime.from.minute}`;
    const time2 = `${newWorkTime.to.hour}:${newWorkTime.to.minute}`;

    for (let j = 0; j < workTimesArray.length; j++) {
      const time3 = `${workTimesArray[j].from.hour}:${workTimesArray[j].from.minute}`;
      const time4 = `${workTimesArray[j].to.hour}:${workTimesArray[j].to.minute}`;
      const result = detectOverlapping(time1, time2, time3, time4);

      workTimesArray[j].isOverlapping = result;
      newWorkTime.isOverlapping = result;
    }

    for (let index = 0; index < data.length; index++) {
      if (data[index].day === currentDay) {
        data[index].workTimes = [...workTimesArray, newWorkTime];
        setData(data);
        return;
      }
    }

    const newData = {
      day: currentDay,
      isWorkDay: true,
      workTimes: [
        {
          id: 1,
          from: {
            hour: 12,
            minute: 0,
          },
          to: {
            hour: 12,
            minute: 30,
          },
          isOnline: false,
          workState: "New",
          isOverlapping: false,
        },
      ],
    };
    setData([...data, newData]);
  };

  useEffect(() => {
    if (toggleStatus === 2) {
      if (localStorage.getItem("myData")) {
        const oldData = JSON.parse(String(localStorage.getItem("myData")));

        for (let index = 0; index < oldData.length; index++) {
          if (oldData[index].day === currentDay) {
            setWorkTimesArray(oldData[index].workTimes);
          }
        }
      }
      else{
        setWorkTimesArray(workTimes)
      }
    }
  }, [toggleStatus]);

  return (
    <section className="flex flex-col justify-center w-full">
      {workTimesArray.map((workTime) => (
        <div
          className="w-full h-full border-2 rounded mb-1 p-3 bg-gray-200"
          key={workTime.id}
        >
          <div className="flex flex-col gap-y-6 mr-auto text-gray-950 font-semibold text-sm">
            <div className="flex w-full justify-center items-center">
              <TimeDialog workTime={formatTime(workTime)} day={currentDay} />
              <div className="ml-auto flex gap-x-2">
                {workTime?.workState ? (
                  <span className="bg-red-200 p-0.5 rounded">
                    {workTime?.workState}
                  </span>
                ) : null}

                {workTime?.isOverlapping ? (
                  <span className="bg-red-200 p-0.5 rounded">Overlapping</span>
                ) : null}

                {workTime?.isOverlapping}

                <Image
                  src={"/trash.svg"}
                  className="ml-auto bg-red-200 p-0.5 rounded cursor-pointer"
                  height={24}
                  width={24}
                  alt="trash"
                  onClick={() => deleteAppointment(workTime?.id)}
                />
              </div>
            </div>
            <button className="mr-auto text-blue-500 font-semibold text-sm">
              + Change visit type
            </button>
          </div>
        </div>
      ))}

      <div className="flex flex-col justify-center w-full h-full border-2 rounded mb-1 p-4 bg-gray-200">
        <button
          className="mr-auto text-blue-500 font-semibold text-sm"
          onClick={addDefaultWorkHours}
        >
          + Add work Hours
        </button>
      </div>
    </section>
  );
};

export default WorkHoursCard;
