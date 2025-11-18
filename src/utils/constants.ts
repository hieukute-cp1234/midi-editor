export const GRID = {
  tracks: 8,
  duration: 60,
  step: 5,
  cellHeight: 40,
  cellWidth: 80,
};

export const MAX_DURATION = 300;
export const TIME_STEP = 5;
export const NUMBER_TRACK = 8;

export const TEMPLATE = {
  id: "",
  name: "Rock Beat 120 BPM",
  description: "Simple rock drum pattern",
  totalDuration: 30,
  trackLabels: [
    "Kick",
    "Snare",
    "Hi-Hat",
    "Crash",
    "Ride",
    "Tom 1",
    "Tom 2",
    "Tambourine",
  ],
  notes: [
    {
      id: "",
      songId: "",
      track: 1,
      time: 0,
      title: "Kick",
      description: "Main kick drum hit",
      color: "#EF4444",
    },
    {
      id: "",
      songId: "",
      track: 2,
      time: 1,
      title: "Snare",
      description: "Backbeat snare",
      color: "#3B82F6",
    },
    {
      id: "",
      songId: "",
      track: 1,
      time: 2,
      title: "Kick",
      description: "Follow-up kick",
      color: "#EF4444",
    },
  ],
};
