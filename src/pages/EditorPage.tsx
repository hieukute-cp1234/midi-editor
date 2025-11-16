import { useEffect, useState } from "react";
import {
  EditorGrid,
  NoteFormModal,
  TimeRuler,
  TrackHeaders,
} from "../components";
import { useMidiDispatch, useMidiStates } from "../hooks";
import { EActionType } from "../types/contextType";
import { Layout } from "../layouts";

export default function EditorPage() {
  const dispatch = useMidiDispatch();
  const { currentSong } = useMidiStates();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const openAdd = () => setOpenModal(true);

  const close = () => {
    setOpenModal(false);
  };

  console.log("currentSong", currentSong);

  useEffect(() => {
    if (!currentSong) {
      dispatch({
        type: EActionType.SET_CURRENT_SONG,
        payload: {
          song: {
            id: "",
            name: "Rock Beat 120 BPM",
            description: "Simple rock drum pattern",
            totalDuration: 30,
            trackLabels: [
              "Kick",
              "Snare",
              "Hi-Hat",
              "Crash",
              "Ride",
              "Tom 1",
              "Tom 2",
              "Tambourine",
            ],
            notes: [
              {
                id: "1",
                track: 1,
                time: 0,
                title: "Kick",
                description: "Main kick drum hit",
                color: "#EF4444",
              },
              {
                id: "2",
                track: 2,
                time: 1,
                title: "Snare",
                description: "Backbeat snare",
                color: "#3B82F6",
              },
              {
                id: "3",
                track: 1,
                time: 2,
                title: "Kick",
                description: "Follow-up kick",
                color: "#EF4444",
              },
              {
                id: "4",
                track: 3,
                time: 0.5,
                title: "Hi-Hat",
                description: "Closed hi-hat",
                color: "#10B981",
              },
            ],
          },
        },
      });
    }
  }, [currentSong, dispatch]);

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            MIDI Editor — Piano Roll (vertical time)
          </h1>
          <button
            className="px-3 py-1 bg-indigo-600 text-white rounded"
            onClick={openAdd}
          >
            Add Note
          </button>
        </div>

        <div className="border rounded-md overflow-hidden">
          <TrackHeaders tracks={currentSong?.trackLabels || []} />
          <div className="flex">
            <TimeRuler />
            <div className="flex-1 h-[600px] piano-scroll relative bg-white">
              <EditorGrid song={currentSong} />
            </div>
          </div>
        </div>

        <NoteFormModal isOpen={openModal} song={currentSong} onClose={close} />
      </div>
    </Layout>
  );
}
