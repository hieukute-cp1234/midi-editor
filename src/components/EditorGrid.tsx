import type { IMidiNote, IMidiSong } from "../types";
import { GRID } from "../utils/constants";

export function EditorGrid({ song }: { song: IMidiSong | null }) {
  const { tracks, duration, step, rowHeight } = GRID;
  const rows = Math.ceil(duration / step);

  const handleClickNote = (note: IMidiNote) => {
    console.log("note", note);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${tracks}, 1fr)`,
        gridAutoRows: `${rowHeight}px`,
        position: "relative",
      }}
    >
      {Array.from({ length: tracks * rows }).map((_, index) => (
        <div key={index} className="border border-gray-100" />
      ))}

      {song?.notes?.map((note: IMidiNote) => {
        const percentWidthOneTrack = 100 / tracks;
        const x = percentWidthOneTrack * note.track - percentWidthOneTrack / 2;
        const y = (note.time / step) * rowHeight;

        return (
          <div
            key={note.id}
            title={`${note.title} @ ${note.time}s`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: y,
              transform: "translate(-50%, 50%)",
              backgroundColor: note?.color || "#fff",
            }}
            className="note-dot cursor-pointer"
            onClick={() => handleClickNote(note)}
          >
            {note.icon ? <span>{note.icon}</span> : null}
          </div>
        );
      })}
    </div>
  );
}
