export default function Unauthorized() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold">
          403 - Access Denied
        </h1>

        <p>
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}