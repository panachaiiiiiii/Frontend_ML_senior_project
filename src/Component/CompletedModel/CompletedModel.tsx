type ModalProps = {
  open: boolean;
  onClose: () => void;
label: string;

};

const CompletedModel = ({ open, onClose, label }: ModalProps) => {
 if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-[240px] sm:w-[360px]  rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center w-full">
        <label className="text-md font-bold mx-auto text-gray-700">{label}</label></div>
        <div className="mt-4">
          <div className="mt-4 mx-auto flex justify-evenly">
            <button
              className="h-10  w-1/3 rounded-md bg-green-600 text-white
                     hover:bg-green-700 transition cursor-pointer"
                onClick={onClose}
            >
              ยืนยัน
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedModel
