"use client";
import DayPart from "@/components/ToggleDayCard";
import WorkHoursCard from "@/components/WorkHoursCard";
import useToggleStore from "./store";
import SaveTimeDialog from "@/components/SaveTimeDialog";
import days from "@/const/my_data";
import { DayOfWeekEnum } from "@/const/my_data";

export default function Home() {
  const { toggleStatus } = useToggleStore();
  
  return (
    <main className="p-2">
      <section>
        {days.map((day) => (
          <div
            className="flex gap-x-1.5 py-1 justify-center"
            key={Object.keys(DayOfWeekEnum)[day.day]}
          >
            <DayPart
              day={Object.keys(DayOfWeekEnum)[day.day]}
              isWorkDayDefault={day.isWorkDay}
            />
            <WorkHoursCard
              currentDay={Object.keys(DayOfWeekEnum)[day.day]}
              workTimes={day.workTimes}
            />
          </div>
        ))}
      </section>
      {toggleStatus == 1 ? <SaveTimeDialog /> : null}
    </main>
  );
}
