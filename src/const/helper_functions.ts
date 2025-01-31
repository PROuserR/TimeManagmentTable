const detectOverlapping = (time1 : string, time2: string, time3: string, time4: string) => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date(),
    date4 = new Date();
  date1.setHours(Number(time1.split(":")[0]), Number(time1.split(":")[1]));
  date2.setHours(Number(time2.split(":")[0]), Number(time1.split(":")[1]));
  date3.setHours(Number(time3.split(":")[0]), Number(time1.split(":")[1]));
  date4.setHours(Number(time4.split(":")[0]), Number(time1.split(":")[1]));

  if (
    (date1.getTime() >= date3.getTime() &&
      date1.getTime() <= date4.getTime()) ||
    (date2.getTime() >= date3.getTime() && date2.getTime() <= date4.getTime())
  ) {
    return true;
  }
  return false;
};

const getDataFromLocalStorage = () => {
  if (localStorage.getItem("myData"))
    return JSON.parse(String(localStorage.getItem("myData")));
  else return [];
};

export { getDataFromLocalStorage, detectOverlapping };
