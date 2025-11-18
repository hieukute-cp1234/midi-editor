import type { IMidiNote, IMidiSong } from ".";

export interface IInititalState {
  currentNode: null | IMidiNote;
  currentSong: null | IMidiSong;
}

export enum EActionType {
  ADD_NOTE = "ADD_NOTE",
  UPDATE_NOTE = "UPDATE_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
  SET_CURRENT_NOTE = "SET_CURRENT_NOTE",
  SET_CURRENT_SONG = "SET_CURRENT_SONG",
  UPDATE_SONG = "UPDATE_SONG",
  CREATE_SONG = "CREATE_SONG",
  UPDATE_TRACKS = "UPDATE_TRACKS",
}

export type TMidiAction =
  | { type: EActionType.ADD_NOTE; payload: { note: IMidiNote } }
  | { type: EActionType.DELETE_NOTE; payload: { noteId: string } }
  | {
      type: EActionType.UPDATE_NOTE;
      payload: { note: IMidiNote };
    }
  | { type: EActionType.SET_CURRENT_NOTE; payload: { note: IMidiNote | null } }
  | { type: EActionType.SET_CURRENT_SONG; payload: { song: IMidiSong | null } }
  | { type: EActionType.UPDATE_SONG; payload: { song: IMidiSong | null } }
  | { type: EActionType.CREATE_SONG; payload: { song: IMidiSong } }
  | { type: EActionType.UPDATE_TRACKS; payload: { tracks: string[] } };
