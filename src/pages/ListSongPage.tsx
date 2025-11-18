import { Layout } from "../layouts";
import { useEffect, useState } from "react";
import {
  getSongsFromStorage,
  deleteSongFromStorage,
  createSongToStorage,
  createMultiSongToStorage,
} from "../utils/storage";
import type { IMidiSong } from "../types";
import { CreateSongModal } from "../components/Modals";
import { ConfirmModal } from "../components/Modals/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { useMidiDispatch } from "../hooks";
import { EActionType } from "../types/contextType";
import { exportMidiJson, importMidiJson } from "../utils/helper";
import { TEMPLATE } from "../utils/constants";

export default function ListSong() {
  const navigate = useNavigate();
  const dispatch = useMidiDispatch();

  const [showNotes, setShowNotes] = useState<string>("");
  const [songs, setSongs] = useState<IMidiSong[]>([]);
  const [songFocus, setSongfocus] = useState<IMidiSong | null>(null);
  const [toggleCreateSong, setToggleCreateSong] = useState<boolean>(false);
  const [toggleConfirmDelete, setToggleConfirmDelete] =
    useState<boolean>(false);

  const handleRedirectEditor = (song: IMidiSong) => {
    dispatch({ type: EActionType.SET_CURRENT_SONG, payload: { song } });
    navigate("/editor");
  };

  const loadSongs = () => {
    const listSongs = getSongsFromStorage({ deep: true });
    setSongs(listSongs);
  };

  const handleClickRow = (songId: string) => {
    if (showNotes === songId) {
      setShowNotes("");
      return;
    }
    setShowNotes(songId);
  };

  const handleInsertSongs = (songs: IMidiSong | IMidiSong[]) => {
    if (Array.isArray(songs)) {
      createMultiSongToStorage(songs);
    } else {
      createSongToStorage(songs);
    }

    loadSongs();
  };

  const handleReloadSong = (result: null | { message: string }) => {
    loadSongs();
    setToggleCreateSong(false);

    if (result) {
      window.alert(result.message);
    }
  };

  const handleDeleteSong = () => {
    if (!songFocus) return;
    const result = deleteSongFromStorage(songFocus.id);
    setSongfocus(null);
    loadSongs();
    setToggleConfirmDelete(false);

    if (result) {
      window.alert(result.message);
    }
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
          <div className="ml-auto">
            <button
              className="ml-2 bg-green-400 hover:bg-green-500 text-white rounded px-2 py-1"
              onClick={() => importMidiJson(handleInsertSongs)}
            >
              Import
            </button>
            <button
              className="ml-2 bg-green-400 hover:bg-green-500 text-white rounded px-2 py-1"
              onClick={() =>
                exportMidiJson({ name: "midi-template", object: TEMPLATE })
              }
            >
              Export template
            </button>
            <button
              className="ml-2 bg-green-400 hover:bg-green-500 text-white rounded px-2 py-1"
              onClick={() => setToggleCreateSong(true)}
            >
              Create
            </button>
          </div>
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

          {songs.map((song) => (
            <div
              key={song.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleClickRow(song.id)}
            >
              <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 w-full">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-gray-800">{song.name}</span>
                </div>

                <button
                  className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                  onClick={() => handleRedirectEditor(song)}
                >
                  View Editor
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
                  className="px-3 py-1 text-sm bg-blue-400 hover:bg-blue-500 text-white rounded ml-1"
                  onClick={() => {
                    exportMidiJson({ name: song.name, object: song });
                  }}
                >
                  Export
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

              {showNotes === song.id && (
                <div className="px-4 py-3 pb-4">
                  <div className="font-semibold text-sm text-gray-700 mb-2 border-b pb-2">
                    Notes ({song?.notes.length})
                  </div>
                  {song?.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 text-sm flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: note.color }}
                      ></div>

                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <span className="text-gray-800 truncate">
                          <strong>Title:</strong>
                          {note.title}
                        </span>

                        <span className="text-gray-600">
                          <strong>Description:</strong> {note.description}
                        </span>
                        <span className="text-gray-700">
                          <strong>Track:</strong> {note.track}
                        </span>

                        <span className="text-gray-600">
                          <strong>Time:</strong> {note.time}s
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
