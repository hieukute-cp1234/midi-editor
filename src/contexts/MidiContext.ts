import { createContext, type ActionDispatch } from "react";
import type { IInititalState, TMidiAction } from "../types/contextType";
import { initialStates } from "./midiReducer";

export const MidiStateContext = createContext<IInititalState>(initialStates);

export const MidiDispatchContext = createContext<
  ActionDispatch<[action: TMidiAction]>
>(() => {});
