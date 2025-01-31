import { getDataFromLocalStorage } from "@/const/helper_functions";
import { create } from "zustand";
import { myDataType } from "@/const/my_types";


type Store = {
  toggleStatus: number; // 0 for hiding 1 for showing 2 for discarding 3 for saving
  setToggleStatus: (value: number) => void;

  data: Array<myDataType>;
  setData: (data: Array<myDataType>) => void;
};

const useToggleStore = create<Store>()((set) => ({
  toggleStatus: 0,
  setToggleStatus: (value: number) => set({ toggleStatus: value }),
  data: getDataFromLocalStorage(),

  setData: (data) => set({ data }),
}));

export default useToggleStore;
