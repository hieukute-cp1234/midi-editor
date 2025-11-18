import type { TMidiAction, IInititalState } from "../types/contextType";

export const initialStates = {
  currentNode: null,
  currentSong: null,
};

export function midiReducer(state: IInititalState, action: TMidiAction) {
  switch (action.type) {
    case "ADD_NOTE": {
      if (!action.payload?.note?.id || !state.currentSong) return state;

      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          notes: [...state.currentSong.notes, action.payload.note],
        },
      };
    }

    case "UPDATE_NOTE": {
      if (!action.payload?.note?.id || !state.currentSong) return state;

      const notesAfterUpdate = state.currentSong.notes.map((note) =>
        note.id === action.payload.note.id
          ? { ...note, ...action.payload.note }
          : note
      );

      return {
        ...state,
        currentSong: { ...state.currentSong, notes: notesAfterUpdate },
      };
    }

    case "DELETE_NOTE": {
      if (!action.payload?.noteId || !state.currentSong) return state;

      const notesAfterDelete = state.currentSong.notes.filter(
        (note) => note.id !== action.payload.noteId
      );

      return {
        ...state,
        currentSong: { ...state.currentSong, notes: notesAfterDelete },
      };
    }

    case "SET_CURRENT_NOTE":
      return { ...state, currentNote: action.payload.note };

    case "SET_CURRENT_SONG":
      return { ...state, currentSong: action.payload.song };

    case "UPDATE_TRACKS": {
      if (!action.payload?.tracks || !state.currentSong) return state;

      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          trackLabels: action.payload.tracks,
        },
      };
    }

    default:
      return state;
  }
}
