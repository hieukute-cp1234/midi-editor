export interface INoteFormModalProps {
  onClose: () => void;
  initialData?: IMidiNote | null;
  song: IMidiSong | null;
}

export interface IContextProps {
  children: React.ReactNode;
}

export interface IMidiNote {
  id?: string;
  songId: string;
  track: number;
  time: number;
  title: string;
  description?: string;
  color: string;
  icon?: string;
}

export type TrackLabel = string;

export interface IMidiSong {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  trackLabels: TrackLabel[];
  notes: IMidiNote[];
  createdAt?: number;
  updatedAt?: number;
}
