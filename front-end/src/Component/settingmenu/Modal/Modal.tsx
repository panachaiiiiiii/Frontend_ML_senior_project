type ModalProps = {
  open: boolean;
  onClose: () => void;
  label: string;

};

const Modal = ({ open, onClose, label  }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-[360px] rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <label className="text-sm text-gray-700">{label}</label>
        <div className="mt-4">
          <input
            className="mt-2 mb-4 h-10 w-full rounded-md border border-gray-400 px-3
                     focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            value={label}
          />
          <div className="mt-4 mx-auto flex justify-evenly">
            <button
              className="h-10  w-1/3 rounded-md bg-green-600 text-white
                     hover:bg-green-700 transition "
            >
              ยืนยัน
            </button>
            <button
              className="h-10  w-1/3 rounded-md bg-gray-300 text-white
                     hover:bg-gray-400 transition"
                     onClick={onClose}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
