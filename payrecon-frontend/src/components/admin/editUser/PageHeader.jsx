const PageHeader = ({ title, description, action }) => {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">{title}</h1>

        <p className="mt-2 text-slate-400">{description}</p>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
