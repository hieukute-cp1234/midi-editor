import { MAX_DURATION } from "../utils/constants";

export function TimeRuler() {
  const marks = Array.from({ length: MAX_DURATION / 2 / 5 + 1 }).map(
    (_, i) => i * 10
  );

  return (
    <div className="w-16 pl-2 bg-gray-100 border-r">
      <div className="">
        {marks.map((m) => (
          <div
            key={m}
            style={{ height: "80px" }}
            className="text-xs text-gray-500 relative"
          >
            <div className="item-timeline">{m}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}
