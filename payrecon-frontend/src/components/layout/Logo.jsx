function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
        <span className="text-white font-bold text-xl">X</span>
      </div>

      <div>
        <h2 className="text-white text-2xl font-bold leading-none">
          ReconcileX
        </h2>

        <p className="text-xs text-gray-500 mt-1">Payment Reconciliation</p>
      </div>
    </div>
  );
}

export default Logo;
