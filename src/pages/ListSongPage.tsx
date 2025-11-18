import { Layout } from "../layouts";
import { useEffect, useState } from "react";
import { getSongsFromStorage, deleteSongFromStorage } from "../utils/storage";
import type { IMidiSong } from "../types";
import { CreateSongModal } from "../components/CreateSongModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { useMidiDispatch } from "../hooks";
import { EActionType } from "../types/contextType";

export default function ListSong() {
  const navigate = useNavigate();
  const dispatch = useMidiDispatch();

  const [songs, setSongs] = useState<IMidiSong[]>([]);
  const [songFocus, setSongfocus] = useState<IMidiSong | null>(null);
  const [toggleCreateSong, setToggleCreateSong] = useState<boolean>(false);
  const [toggleConfirmDelete, setToggleConfirmDelete] =
    useState<boolean>(false);

  const handleRedirectEditor = (song: IMidiSong) => {
    console.log("editor", song);
    dispatch({ type: EActionType.SET_CURRENT_SONG, payload: { song } });
    navigate("/editor");
  };

  const loadSongs = () => {
    const listSongs = getSongsFromStorage();
    setSongs(listSongs);
  };

  const handleReloadSong = () => {
    loadSongs();
    setToggleCreateSong(false);
  };

  const handleDeleteSong = () => {
    if (!songFocus) return;
    deleteSongFromStorage(songFocus.id);
    setSongfocus(null);
    loadSongs();
    setToggleConfirmDelete(false);
  };

  const handleCancel = () => {
    setSongfocus(null);
    setToggleConfirmDelete(false);
    setToggleCreateSong(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSongs();
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center">
          <h2 className="text-xl font-semibold">Song list</h2>
          <button
            className="ml-auto bg-green-400 hover:bg-green-500 text-white rounded px-2 py-1"
            onClick={() => setToggleCreateSong(true)}
          >
            + Add
          </button>
        </div>

        <div className="divide-y">
          {!songs.length && (
            <div className="p-2 text-center">
              No song yet,{" "}
              <button
                className="text-blue-600 hover:underline font-medium"
                onClick={() => setToggleCreateSong(true)}
              >
                click here
              </button>{" "}
              to create a song
            </div>
          )}

          {songs.map((song, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-800">{song.name}</span>
              </div>

              <button
                className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                onClick={() => handleRedirectEditor(song)}
              >
                View
              </button>

              <button
                className="px-3 py-1 text-sm bg-blue-400 hover:bg-blue-500 text-white rounded ml-1"
                onClick={() => {
                  setSongfocus(song);
                  setToggleCreateSong(true);
                }}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 text-sm bg-red-400 hover:bg-red-500 text-white rounded ml-1"
                onClick={() => {
                  setSongfocus(song);
                  setToggleConfirmDelete(true);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {toggleCreateSong && (
        <CreateSongModal
          currentSong={songFocus}
          onSubmited={handleReloadSong}
          onCancel={handleCancel}
        />
      )}

      {toggleConfirmDelete && (
        <ConfirmModal
          title="Delete Song"
          description={`Are you sure you want to delete ${songFocus?.name} song?`}
          onOk={handleDeleteSong}
          onCancel={handleCancel}
        />
      )}
    </Layout>
  );
}
