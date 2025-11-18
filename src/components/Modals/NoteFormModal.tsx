import { useEffect, useState } from "react";
import type { IMidiNote, INoteFormModalProps } from "../../types";
import { useMidiDispatch } from "../../hooks";
import { EActionType } from "../../types/contextType";
import { v4 as uuid } from "uuid";
import {
  createNoteToStorage,
  deleteNoteFromStorage,
  updateNoteToStorage,
} from "../../utils/storage";

export function NoteFormModal({
  onClose,
  initialData,
  song,
}: INoteFormModalProps) {
  const dispatch = useMidiDispatch();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formNote, setDataNote] = useState<IMidiNote>({
    track: 1,
    songId: song?.id || "",
    time: 0,
    title: "",
    description: "",
    color: "#222222",
    icon: "",
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataNote(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "time") {
      const num = Number(value);

      if (num % 5 !== 0) {
        setErrors((prev) => ({ ...prev, time: "Step is 5" }));
      }
    }
    setDataNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newNote = { id: uuid(), ...formNote, songId: song?.id || "" };
    let result = null;

    if (initialData) {
      dispatch({
        type: EActionType.UPDATE_NOTE,
        payload: { note: newNote },
      });
      result = updateNoteToStorage(newNote);
    } else {
      const noteInvalid = song?.notes?.find(
        (note) =>
          `${note.track}-${note.time}` === `${formNote.track}-${formNote.time}`
      );

      if (noteInvalid) {
        window.alert("Note already exists!");
        return;
      }

      dispatch({
        type: EActionType.ADD_NOTE,
        payload: { note: newNote },
      });
      result = createNoteToStorage(newNote, song?.id || "");
    }
    onClose();

    if (result) {
      window.alert(result.message);
    }
  };

  const handleDeleteNote = () => {
    dispatch({
      type: EActionType.DELETE_NOTE,
      payload: { noteId: initialData?.id || "" },
    });
    const result = deleteNoteFromStorage({
      noteId: initialData?.id || "",
      songId: initialData?.songId || "",
    });
    onClose();
    if (result) {
      window.alert(result.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Note" : "Add Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Track (1–8)
            </label>
            <select
              name="track"
              value={formNote.track}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              {song?.trackLabels?.map((label, index) => (
                <option key={label + index} value={index + 1}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Time (seconds)
            </label>
            <input
              type="number"
              name="time"
              step={5}
              min="0"
              value={formNote.time}
              onChange={handleChange}
              className={`border rounded p-2 w-full ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors?.time && (
              <p className="text-red-500 text-xs mt-1">{errors.time}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formNote.title || song?.trackLabels[formNote.track - 1]}
              onChange={handleChange}
              className={`border rounded p-2 w-full ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. C4, Kick, Snare"
              required
            />

            {errors?.title && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formNote.description}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="Optional note details..."
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Color</label>
            <input
              type="color"
              name="color"
              value={formNote.color}
              onChange={handleChange}
              className="w-12 h-10 p-1 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Icon (emoji)
            </label>
            <input
              type="text"
              name="icon"
              value={formNote.icon}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="e.g. 🎹 🥁 🎸"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {initialData ? "Save Changes" : "Add Note"}
            </button>

            {!!initialData && (
              <button
                type="button"
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={handleDeleteNote}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
