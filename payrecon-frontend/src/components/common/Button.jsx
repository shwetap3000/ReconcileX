const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  const baseStyle =
    "rounded-xl px-6 py-3 font-medium transition-all duration-200";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-[1.02]",

    secondary: "border border-slate-700 text-white hover:bg-slate-800",

    outline: "border border-blue-600 text-blue-400 hover:bg-blue-600/10",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
