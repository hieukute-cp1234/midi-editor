import type { IMidiNote, IMidiSong } from "../types";

// songs
export function getSongsFromStorage(songId?: string): IMidiSong[] {
  const all = JSON.parse(localStorage.getItem("songs") || "[]");
  return songId ? all.filter((song: IMidiSong) => song.id === songId) : all;
}

export function createSongToStorage(song: IMidiSong) {
  const all = getSongsFromStorage();
  const newSongs = [...all, song];
  localStorage.setItem("songs", JSON.stringify(newSongs));
  return {
    status: true,
    message: "Create song successfully!",
  };
}

export function updateSongToStorage(song: IMidiSong) {
  const all = getSongsFromStorage();
  const updated = [
    ...all.map((item) => {
      if (item.id === song.id) return { ...item, ...song };
      return song;
    }),
  ];
  localStorage.setItem("songs", JSON.stringify(updated));

  return {
    message: "Update song success!",
  };
}

export function deleteSongFromStorage(id: string) {
  const all = getSongsFromStorage().filter((s) => s.id !== id);
  localStorage.setItem("songs", JSON.stringify(all));

  return {
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
      message: "Note is existed!",
    };
  }

  const allNotes = getNotesFromStorage();
  const newListNote = [...allNotes, newNote];
  localStorage.setItem("notes", JSON.stringify(newListNote));
}

export function updateNoteToStorage(note: IMidiNote & { songId: string }) {
  const all = getNotesFromStorage();
  const updated = [...all.filter((n) => n.id !== note.id), note];
  localStorage.setItem("notes", JSON.stringify(updated));

  return {
    message: "Update note success!",
  };
}

export function deleteNoteFromStorage(id: string) {
  const all = getNotesFromStorage().filter((n) => n.id !== id);
  localStorage.setItem("notes", JSON.stringify(all));

  return {
    message: "Delete note success!",
  };
}
