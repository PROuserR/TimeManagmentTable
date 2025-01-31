import useToggleStore from "@/app/store";
import Image from "next/image";

const SaveTimeDialog = () => {
  const { setToggleStatus, data } = useToggleStore();

  const discardChanges = () => {
    setToggleStatus(2);
  };

  const saveChanges = () => {
    localStorage.setItem("myData", JSON.stringify(data));
    setToggleStatus(3);
  };

  return (
    <div className="flex justify-center items-center shadow-lg gap-x-6 p-2 rounded fixed bottom-4 left-[10%] bg-gray-50">
      <span className="mr-64">You have unsaved changes.</span>
      <div className="flex gap-x-6">
        <button
          className="flex justify-center items-center p-2 text-red-500 text-sm"
          onClick={discardChanges}
        >
          <Image src="/x.svg" width={25} height={25} alt="check" />
          Discard changes
        </button>
        <button
          className="flex justify-center items-center border rounded p-2 border-green-500 text-green-500 text-sm"
          onClick={saveChanges}
        >
          <Image src="/check.svg" width={25} height={25} alt="check" />
          Save changes
        </button>
      </div>
    </div>
  );
};

export default SaveTimeDialog;
