function PageLayout({ title, subtitle, children, actions }) {
  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>

          <p className="mt-2 text-gray-400">
            {subtitle}
          </p>
        </div>

        {actions && (
          <div>
            {actions}
          </div>
        )}

      </div>

      {children}

    </div>
  );
}

export default PageLayout;