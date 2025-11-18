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
import { v4 as uuid } from "uuid";

export default function EditorPage() {
  const dispatch = useMidiDispatch();
  const { currentSong } = useMidiStates();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const openAdd = () => setOpenModal(true);

  const close = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!currentSong) {
      const songId = uuid();

      dispatch({
        type: EActionType.SET_CURRENT_SONG,
        payload: {
          song: {
            id: songId,
            name: "Rock Beat 120 BPM",
            description: "Simple rock drum pattern",
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
          },
        },
      });
    }
  }, [currentSong, dispatch]);

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">MIDI Editor — Piano Roll</h1>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{currentSong?.name || ""}</h1>
          <button
            className="px-3 py-1 bg-indigo-600 text-white rounded"
            onClick={openAdd}
          >
            Add Note
          </button>
        </div>

        <div className="border rounded-md overflow-hidden">
          <TrackHeaders tracks={currentSong?.trackLabels || []} />
          <div className="flex piano-scroll">
            <TimeRuler totalTime={currentSong?.totalDuration} />
            <div className="flex-1 relative bg-white">
              <EditorGrid song={currentSong} />
            </div>
          </div>
        </div>

        {openModal && <NoteFormModal song={currentSong} onClose={close} />}
      </div>
    </Layout>
  );
}
