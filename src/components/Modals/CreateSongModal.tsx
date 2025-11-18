import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { createSongToStorage, updateSongToStorage } from "../../utils/storage";
import type { IMidiSong } from "../../types";

interface IErrors {
  name: string;
  totalDuration: string;
}

export function CreateSongModal({
  currentSong,
  onCancel,
  onSubmited,
}: {
  currentSong: IMidiSong | null;
  onCancel: () => void;
  onSubmited: () => void;
}) {
  const [formData, setFormData] = useState<IMidiSong>({
    id: "",
    name: "",
    description: "",
    totalDuration: 300,
    trackLabels: [
      "Track 1",
      "Track 2",
      "Track 3",
      "Track 4",
      "Track 5",
      "Track 6",
      "Track 7",
      "Track 8",
    ],
    notes: [],
  });
  const [errors, setErrors] = useState<IErrors>({
    name: "",
    totalDuration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, name: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrackChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newTrackLabels = [...formData.trackLabels];
      newTrackLabels[index] = value;

      return {
        ...prev,
        trackLabels: newTrackLabels,
      };
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (currentSong) {
      updateSongToStorage({ ...formData, updatedAt: Date.now() });
    } else {
      createSongToStorage({
        id: uuid(),
        name: formData.name,
        totalDuration: formData.totalDuration,
        trackLabels: formData.trackLabels,
        notes: [],
        description: formData.description,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    onSubmited();
  };

  useEffect(() => {
    if (currentSong) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ ...currentSong });
    }
  }, [currentSong]);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create new Song</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={`border rounded p-2 w-full ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Song name"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="description for song..."
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Duration</label>
            <input
              type="number"
              name="totalDuration"
              min={0}
              max={300}
              required
              value={formData.totalDuration}
              onChange={handleChange}
              className={`border rounded p-2 w-full ${
                errors.totalDuration ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="300s"
            />

            {errors.totalDuration && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalDuration}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Track Labels
            </label>

            <div className="grid grid-cols-2 gap-3">
              {formData.trackLabels.map((name, index) => (
                <div key={index}>
                  <input
                    type="text"
                    required
                    placeholder={`Track ${index + 1}`}
                    value={name}
                    onChange={(e) => handleTrackChange(index, e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {currentSong ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
