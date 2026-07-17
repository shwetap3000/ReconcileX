import React from "react";
import { Plus } from "lucide-react";

const CreateBatchBtn = () => {
  return (
    <div className="relative">
      <button
        className="h-12
          px-6
          rounded-xl
          bg-[#4F6BFF]
          flex
          items-center
          gap-2
          hover:bg-[#3F5AF5]
        "
      >
        <Plus size={18} />
        New Batch
      </button>
    </div>
  );
};

export default CreateBatchBtn;
