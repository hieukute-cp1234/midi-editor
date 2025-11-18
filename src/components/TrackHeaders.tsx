import { useEffect, useState } from "react";
import { NUMBER_TRACK } from "../utils/constants";
import { useMidiDispatch } from "../hooks";
import { EActionType } from "../types/contextType";

export function TrackHeaders({
  tracks,
  onUpdateSong,
}: {
  tracks: string[];
  onUpdateSong?: (tracks: string[]) => void;
}) {
  const dispatch = useMidiDispatch();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [trackNames, setTrackNames] = useState(tracks);

  useEffect(() => {
    setTrackNames(tracks);
  }, [tracks]);

  const handleEdit = (i: number) => {
    setEditingIndex(i);
  };

  const handleChange = (i: number, value: string) => {
    setTrackNames((prev) => {
      const newTracks = [...prev];
      newTracks[i] = value;
      return newTracks;
    });
  };

  const finishEdit = () => {
    setEditingIndex(null);
    dispatch({
      type: EActionType.UPDATE_TRACKS,
      payload: { tracks: trackNames },
    });
    onUpdateSong?.(trackNames);
  };

  return (
    <div className="flex bg-gray-50 border-b">
      <div className="w-16 p-2 border-r">Track / Time</div>
      <div className="flex-1 grid grid-cols-8">
        {Array.from({ length: tracks?.length || NUMBER_TRACK }).map(
          (_, index) => (
            <div
              key={index}
              className="p-2 text-center border-r border-gray-200"
              onClick={() => handleEdit(index)}
            >
              {editingIndex === index ? (
                <input
                  autoFocus
                  value={trackNames[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onBlur={finishEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") finishEdit();
                  }}
                  className="w-full text-center border rounded p-1"
                />
              ) : (
                trackNames[index] || `Track ${index + 1}`
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
