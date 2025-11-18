import type { IMidiNote, IMidiSong } from ".";

export interface INoteFormModalProps {
  onClose: () => void;
  initialData?: IMidiNote | null;
  song: IMidiSong | null;
}

export interface IConfirmModalProps {
  title: string;
  description: string;
  onCancel: () => void;
  onOk: () => void;
}

export interface ICreateSongModalProps {
  currentSong: IMidiSong | null;
  onCancel: () => void;
  onSubmited: (result: null | { message: string }) => void;
}
