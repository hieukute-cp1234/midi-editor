import { useEffect, useReducer, useMemo } from "react";
import type { IContextProps } from "../types";
import { midiReducer, initialStates } from "./midiReducer";
import { MidiDispatchContext, MidiStateContext } from "./MidiContext";

export const MidiProvider = ({ children }: IContextProps) => {
  const [state, dispatch] = useReducer(midiReducer, initialStates);

  useEffect(() => {
    try {
      localStorage.setItem("midi_songs", JSON.stringify(state.songs));
    } catch (e) {
      console.error("save notes", e);
    }
  }, [state.songs]);

  const memoDispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <MidiStateContext.Provider value={state}>
      <MidiDispatchContext value={memoDispatch}>{children}</MidiDispatchContext>
    </MidiStateContext.Provider>
  );
};
