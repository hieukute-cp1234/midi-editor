import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import ListSongPage from "./pages/ListSongPage";
import { MidiProvider } from "./contexts/MidiProvider";

export default function App() {
  return (
    <MidiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListSongPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </MidiProvider>
  );
}
