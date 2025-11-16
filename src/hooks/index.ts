import { useContext } from "react";
import { MidiDispatchContext, MidiStateContext } from "../contexts";

export function useMidiStates() {
  const context = useContext(MidiStateContext);

  if (context === undefined) {
    throw new Error("useMidiStates must be used within a MidiProvider");
  }
  return context;
}

export function useMidiDispatch() {
  const context = useContext(MidiDispatchContext);

  if (context === undefined) {
    throw new Error("useMidiDispatch must be used within a MidiProvider");
  }
  return context;
}
