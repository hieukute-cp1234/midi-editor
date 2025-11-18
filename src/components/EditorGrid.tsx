import { useState } from "react";
import type { IMidiNote, IMidiSong } from "../types";
import {
  GRID,
  MAX_DURATION,
  NUMBER_TRACK,
  TIME_STEP,
} from "../utils/constants";
import { NoteFormModal } from "./Modals/NoteFormModal";

export function EditorGrid({ song }: { song: IMidiSong | null }) {
  const { cellHeight } = GRID;
  const rows = Math.ceil((song?.totalDuration || MAX_DURATION) / TIME_STEP);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [initDataForm, setInitDataForm] = useState<IMidiNote | null>(null);

  const handleClickNote = (note: IMidiNote) => {
    setInitDataForm(note);
    setOpenModal(true);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${NUMBER_TRACK}, 1fr)`,
          gridAutoRows: `${cellHeight}px`,
          position: "relative",
        }}
      >
        {Array.from({ length: NUMBER_TRACK * rows }).map((_, index) => {
          const rowIndex = Math.floor(index / NUMBER_TRACK);
          const timeAtRow = rowIndex * TIME_STEP;
          const isBoldBelow = timeAtRow % 10 === 0 && rowIndex !== 0;

          return (
            <div
              key={index}
              className={`border border-gray-100 ${
                isBoldBelow ? "border-t-2 border-t-gray-400" : ""
              }`}
            />
          );
        })}

        {song?.notes?.map((note: IMidiNote) => {
          const percentWidthOneTrack = 100 / NUMBER_TRACK;
          const x =
            percentWidthOneTrack * note.track - percentWidthOneTrack / 2;
          const y = (note.time / TIME_STEP) * cellHeight;

          return (
            <div
              key={note.id}
              title={`${note.title} @ ${note.time}s`}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: y,
                transform: "translate(-50%, -50%)",
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

      {openModal && (
        <NoteFormModal
          song={song}
          initialData={initDataForm}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
