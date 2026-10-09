export default function Loading() {
  return (
    <div className="app-shell py-14" role="status" aria-live="polite">
      <p className="text-19">Loading the next page...</p>
      <div className="mt-4 h-2 max-w-sm rounded bg-gray-200" aria-hidden="true" />
    </div>
  );
}
