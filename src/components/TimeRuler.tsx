export function TimeRuler() {
  const marks = Array.from({ length: 61 / 5 }).map((_, i) => i * 5);

  return (
    <div className="w-16 p-2 bg-gray-100 border-r">
      <div className="mt-2">
        {marks.map((m) => (
          <div
            key={m}
            style={{ height: "50px" }}
            className="text-xs text-gray-500"
          >
            {m}s
          </div>
        ))}
      </div>
    </div>
  );
}
