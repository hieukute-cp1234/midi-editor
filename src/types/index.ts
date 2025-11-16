export interface INoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IMidiNote;
  song: IMidiSong | null;
}

export interface IContextProps {
  children: React.ReactNode;
}

export interface IMidiNote {
  id?: string;
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
  tags?: string;
  notes: IMidiNote[];
  createdAt?: number;
  updatedAt?: number;
}
