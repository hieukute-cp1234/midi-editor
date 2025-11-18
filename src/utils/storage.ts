import type { IMidiNote, IMidiSong } from "../types";

// songs
export function getSongsFromStorage({
  songId,
  deep = false,
}: {
  songId?: string;
  deep?: boolean;
}) {
  const all = JSON.parse(localStorage.getItem("songs") || "[]");
  const result = songId
    ? all.filter((song: IMidiSong) => song.id === songId)
    : all;

  return deep
    ? result.map((song: IMidiSong) => ({
        ...song,
        notes: getNotesFromStorage(song.id),
      }))
    : result;
}

export function createSongToStorage(song: IMidiSong) {
  const all = getSongsFromStorage({});
  const newSongs = [...all, song];
  localStorage.setItem("songs", JSON.stringify(newSongs));

  return {
    status: true,
    data: song,
    message: "Create song successfully!",
  };
}

export function createMultiSongToStorage(songs: IMidiSong[]) {
  const all = getSongsFromStorage({});
  const newSongs = [...all, ...songs];
  localStorage.setItem("songs", JSON.stringify(newSongs));

  return {
    status: true,
    data: songs,
    message: "Create song successfully!",
  };
}

export function updateSongToStorage(song: IMidiSong) {
  const all = getSongsFromStorage({});
  const updated = [
    ...all.map((item: IMidiSong) => {
      if (item.id === song.id) return { ...item, ...song };
      return song;
    }),
  ];

  localStorage.setItem("songs", JSON.stringify(updated));

  return {
    status: true,
    data: song,
    message: "Update song success!",
  };
}

export function deleteSongFromStorage(id: string) {
  const allSongs = getSongsFromStorage({});
  const songNeedDelete = allSongs.find((song: IMidiSong) => song.id === id);

  if (!songNeedDelete)
    return {
      status: false,
      data: null,
      message: "Delete song error!",
    };

  const allNotes = getNotesFromStorage();
  const newSongs = allSongs.filter((song: IMidiSong) => song.id !== id);
  const newNotes = allNotes.filter((note) => note.songId !== id);

  localStorage.setItem("songs", JSON.stringify(newSongs));
  localStorage.setItem("notes", JSON.stringify(newNotes));

  return {
    status: true,
    data: newSongs,
    message: "Delete song success!",
  };
}

// notes
export function getNotesFromStorage(songId?: string): IMidiNote[] {
  const all = JSON.parse(localStorage.getItem("notes") || "[]");
  return songId ? all.filter((n: IMidiNote) => n.songId === songId) : all;
}

export function createNoteToStorage(newNote: IMidiNote, songId: string) {
  const noteBySong = getNotesFromStorage(songId);
  const invalid = noteBySong.find((note) => note.id === newNote.id);

  if (invalid) {
    return {
      status: false,
      data: null,
      message: "Note is existed!",
    };
  }

  const allSongs = getSongsFromStorage({});
  const allNotes = getNotesFromStorage();

  const newListNote = [...allNotes, newNote];
  const newSongs = allSongs.map((song: IMidiSong) => {
    if (song.id === songId) {
      return { ...song, notes: [...song.notes, newNote.id] };
    }
    return song;
  });

  localStorage.setItem("notes", JSON.stringify(newListNote));
  localStorage.setItem("songs", JSON.stringify(newSongs));

  return {
    status: true,
    data: newNote,
    message: "Create note successfully!",
  };
}

export function updateNoteToStorage(note: IMidiNote & { songId: string }) {
  const all = getNotesFromStorage();
  const updated = [...all.filter((n) => n.id !== note.id), note];
  localStorage.setItem("notes", JSON.stringify(updated));

  return {
    status: true,
    message: "Update note success!",
  };
}

export function deleteNoteFromStorage({
  noteId,
  songId,
}: {
  noteId: string;
  songId: string;
}) {
  const allNotes = getNotesFromStorage().filter((note) => note.id !== noteId);
  const allSongs = getSongsFromStorage({}).map(
    (song: IMidiSong & { notes: string[] }) => {
      if (song.id === songId) {
        return {
          ...song,
          notes: song.notes.filter((id: string) => id !== noteId),
        };
      }
      return song;
    }
  );

  localStorage.setItem("notes", JSON.stringify(allNotes));
  localStorage.setItem("songs", JSON.stringify(allSongs));

  return {
    message: "Delete note success!",
  };
}
