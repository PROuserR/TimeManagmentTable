"use client";
import useToggleStore from "@/app/store";
import { useEffect, useState } from "react";

type toggleDatCardDataProps = {
  day: string;
  isWorkDayDefault: boolean;
};

const DayPart = ({ day, isWorkDayDefault }: toggleDatCardDataProps) => {
  const { setToggleStatus, toggleStatus, setData, data } = useToggleStore();

  const getToggleFromDataStore = () => {
    if (toggleStatus != 2) {
      for (let index = 0; index < data.length; index++) {
        if (data[index].day === day) return data[index].isWorkDay;
      }
      return isWorkDayDefault;
    }
  };

  const [isWorkDay, setIsWorkDay] = useState(getToggleFromDataStore());

  const [bgCardColor, setBgCardColor] = useState(
    isWorkDay ? "bg-gray-50" : "bg-gray-200"
  );

  const [checkBoxBgColor, setCheckBoxBgColor] = useState(
    isWorkDay ? "bg-blue-600" : "bg-gray-100"
  );

  const handleToggle = () => {
    setToggleStatus(1);
    setIsWorkDay(!isWorkDay);
    for (let index = 0; index < data.length; index++) {
      if (data[index].day === day) data[index].isWorkDay = !isWorkDay;
    }
    setData(data);
    if (isWorkDay) {
      setBgCardColor("bg-gray-200");
      setCheckBoxBgColor("bg-gray-100");
    } else {
      setBgCardColor("bg-gray-50");
      setCheckBoxBgColor("bg-blue-600");
    }
  };

  useEffect(() => {
    if (toggleStatus === 2) {
      if (localStorage.getItem("myData")) {
        const oldData = JSON.parse(String(localStorage.getItem("myData")));
        for (let index = 0; index < oldData.length; index++) {
          if (oldData[index].day === day) {
            setIsWorkDay(oldData[index].isWorkDay);
          }
        }
      }
      else{
        setIsWorkDay(isWorkDayDefault)
      }
    }

  }, [toggleStatus]);

  return (
    <div
      className={`w-48 text-center p-4 font-bold flex flex-col items-center justify-center border-2 ${bgCardColor}`}
    >
      {day}

      <div>
        <input
          className={`mr-2 mt-2 h-3 w-8  appearance-none rounded-[0.4375rem] bg-gray-100 before:pointer-events-none before:absolute before:h-3 before:w-3 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-blue-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-blue-600 dark:after:bg-gray-50 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]`}
          type="checkbox"
          role="switch"
          checked={isWorkDay}
          id="flexSwitchCheckDefault"
          onChange={handleToggle}
        />
      </div>

      {isWorkDay ? (
        <span className="w-20">Work day</span>
      ) : (
        <span className="w-20">Day off</span>
      )}
    </div>
  );
};

export default DayPart;
