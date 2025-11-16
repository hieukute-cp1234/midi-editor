import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListSongPage from "./pages/ListSongPage";
import { MidiProvider } from "./contexts/MidiProvider";

export default function App() {
  return (
    <MidiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListSongPage />} />
        </Routes>
      </BrowserRouter>
    </MidiProvider>
  );
}
