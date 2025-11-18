import { openDB, dbGetAll, dbPut, dbDelete } from "./indexedDB";

export interface MidiSong {
  id: string;
  name: string;
  description?: string;
  duration: number;
  tracks: string[];
}

export interface MidiNote {
  id: string;
  songId: string;
  trackIndex: number;
  time: number;
  title?: string;
  description?: string;
  color?: string;
}

let dbPromise: Promise<IDBDatabase> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB({
      dbName: "midi_db",
      version: 1,
      stores: [
        { name: "songs", keyPath: "id" },
        { name: "notes", keyPath: "id" },
      ],
    });
  }
  return dbPromise;
}

/* SONGS */
export async function saveSong(song: MidiSong) {
  const db = await getDB();
  return dbPut(db, "songs", song);
}

export async function getAllSongs() {
  const db = await getDB();
  return dbGetAll<MidiSong>(db, "songs");
}

export async function deleteSong(id: string) {
  const db = await getDB();
  return dbDelete(db, "songs", id);
}

/* NOTES */
export async function saveNote(note: MidiNote) {
  const db = await getDB();
  return dbPut(db, "notes", note);
}

export async function getNotesForSong(songId: string) {
  const db = await getDB();
  const all = await dbGetAll<MidiNote>(db, "notes");
  return all.filter((n) => n.songId === songId);
}

export async function deleteNote(id: string) {
  const db = await getDB();
  return dbDelete(db, "notes", id);
}
