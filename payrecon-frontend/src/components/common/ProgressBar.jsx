function ProgressBar({ value }) {
  return (
    <div className="w-28 h-2 bg-[#243041] rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}

export default ProgressBar;