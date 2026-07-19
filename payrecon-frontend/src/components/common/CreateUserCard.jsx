const CreateUserCard = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-[#081221] shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default CreateUserCard;