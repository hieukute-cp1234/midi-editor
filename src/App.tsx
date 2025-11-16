import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListSongPage from "./pages/ListSongPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListSongPage />} />
      </Routes>
    </BrowserRouter>
  );
}
