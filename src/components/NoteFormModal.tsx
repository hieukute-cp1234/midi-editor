import { useState } from "react";
import type { IMidiNote, INoteFormModalProps } from "../types";
import { useMidiDispatch } from "../hooks";
import { EActionType } from "../types/contextType";
import { v4 as uuid } from "uuid";

export function NoteFormModal({
  isOpen,
  onClose,
  initialData,
  song,
}: INoteFormModalProps) {
  const dispatch = useMidiDispatch();

  const [formNote, setDataNote] = useState<IMidiNote>({
    track: 1,
    time: 0,
    title: "",
    description: "",
    color: "#222222",
    icon: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDataNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({
      type: EActionType.ADD_NOTE,
      payload: { note: { id: uuid(), ...formNote } },
    });
    onClose();
  };

  if (!isOpen) return null;

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
                <option key={label + index} value={label}>
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
              min="0"
              value={formNote.time}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={song?.trackLabels[formNote.track]}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="e.g. C4, Kick, Snare"
              required
            />
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
          </div>
        </form>
      </div>
    </div>
  );
}
