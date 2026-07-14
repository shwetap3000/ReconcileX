function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-800 to-indigo-900 flex items-center justify-center">
        <span className="text-white font-bold text-xl">X</span>
      </div>

      <div>
        <h2 className="text-white text-[22px] font-bold leading-none">
          ReconcileX
        </h2>

        <p className="text-xs text-gray-500 mt-1">Payment Reconciliation</p>
      </div>
    </div>
  );
}

export default Logo;
