const BatchInformation = () => {
  return (
    <div className="bg-[#141c2f] border border-[#232d45] rounded-xl p-6">

      <h3 className="text-lg font-semibold text-white mb-6">
        Batch Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">
            Batch Name
          </label>

          <input
            className="w-full bg-[#0F172A] border border-[#263247] rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500"
            placeholder="Reconciliation_19_May_2025"
          />
        </div>

        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">
            Reconciliation Date
          </label>

          <input
            type="date"
            className="w-full bg-[#0F172A] border border-[#263247] rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">
            Description
          </label>

          <input
            className="w-full bg-[#0F172A] border border-[#263247] rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500"
            placeholder="Optional"
          />
        </div>

      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-medium">
          Upload & Process Files
        </button>
      </div>

    </div>
  );
};

export default BatchInformation;