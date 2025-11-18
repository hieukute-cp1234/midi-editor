import type { IMidiSong } from "../types";
import { v4 as uuid } from "uuid";

function validateMidiJson(data: IMidiSong) {
  if (typeof data.id !== "string")
    return { status: false, message: "'id' must be a string!" };

  if (typeof data.name !== "string")
    return { status: false, message: "'name' must be a string!" };

  if (!Array.isArray(data.trackLabels))
    return { status: false, message: "'trackLabels' must be a array!" };

  if (data.trackLabels?.length > 8)
    return { status: false, message: "'trackLabels' length maximum is 8!" };

  for (const track of data.trackLabels) {
    if (typeof track !== "string")
      return { status: false, message: "'trackLabel' must be a string!" };
  }

  if (typeof data.totalDuration !== "number")
    return { status: false, message: "'totalDuration' must be a number!" };

  if (data.totalDuration > 0 && data.totalDuration < 300)
    return {
      status: false,
      message: "'totalDuration' between 0s -> 300s!",
    };

  for (const note of data.notes) {
    if (typeof note !== "object")
      return { status: false, message: "'note' must be a object!" };

    if (typeof note.id !== "string")
      return { status: false, message: "'note.id' must be a string!" };

    if (typeof note.track !== "number")
      return { status: false, message: "'note.track' must be a number!" };

    if (typeof note.time !== "number")
      return { status: false, message: "'note.time' must be a number!" };

    if (!note.title)
      return { status: false, message: "'note.title' cannot be left blank!" };
  }

  return { status: true, message: "done" };
}

function handleDataBeforeInsert(data: IMidiSong): IMidiSong {
  const newData = { ...data };
  const newSongId = uuid();

  if (!data.id) {
    newData.id = newSongId;
  }

  if (!data.name) {
    newData.name = `Song ${newSongId}`;
  }

  if (data.trackLabels?.length < 8) {
    const newTrackLabels = [...data.trackLabels];
    for (let i = data.trackLabels?.length; i < 8; i++) {
      newTrackLabels.push(`Track ${i + 1}`);
    }
    newData.trackLabels = newTrackLabels;
  }

  if (data.notes?.length) {
    const seen = new Set<string>();

    const newNotes = data.notes
      .map((note) => ({
        id: note?.id || uuid(),
        songId: newSongId,
        track: note?.track || 1,
        color: note?.color || "#222222",
        time: note?.time || 300,
        title: note?.title || "title",
        description: note?.description || "",
      }))
      .filter((note) => {
        const key = `${note.track}-${note.time}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    newData.notes = newNotes;
  }

  return newData;
}

export function exportMidiJson({
  name,
  object,
}: {
  name: string;
  object: IMidiSong;
}) {
  const data = JSON.stringify(object, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

export function importMidiJson(onPushOutData: (data: IMidiSong) => void) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        let validate = { status: true, message: "pass" };

        if (!Array.isArray(data)) {
          validate = validateMidiJson(data);
        } else {
          for (let i = 0; i < data.length; i++) {
            const { status, message } = validateMidiJson(data[i]);
            if (!status) {
              validate = { status, message };
              break;
            }
          }
        }

        const { status, message } = validate;

        if (status) {
          alert(message);
          return;
        }

        onPushOutData(handleDataBeforeInsert(data));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        alert("Cannot read JSON file!");
      }
    };

    reader.readAsText(file);
  };

  input.click();
}
