function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-[#141C28]
        border
        border-[#243041]
        rounded-2xl
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;