import { useReducer, useMemo } from "react";
import type { IContextProps } from "../types";
import { midiReducer, initialStates } from "./midiReducer";
import { MidiDispatchContext, MidiStateContext } from "./MidiContext";

export const MidiProvider = ({ children }: IContextProps) => {
  const [state, dispatch] = useReducer(midiReducer, initialStates);
  const memoDispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <MidiStateContext.Provider value={state}>
      <MidiDispatchContext value={memoDispatch}>{children}</MidiDispatchContext>
    </MidiStateContext.Provider>
  );
};
