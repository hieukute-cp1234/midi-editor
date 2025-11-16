import { Link } from "react-router-dom";
import { useMidiStates } from "../hooks";
import { Layout } from "../layouts";

export default function ListSong() {
  const { songs } = useMidiStates();

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-4 border-b text-center">
          Danh sách bài hát
        </h2>

        <div className="divide-y">
          {!songs.length && (
            <div className="p-2 text-center">
              Chưa có bài hát nào,{" "}
              <Link
                to="/editor"
                className="text-blue-600 hover:underline font-medium"
              >
                bấm vào đây
              </Link>{" "}
              tạo bài hát
            </div>
          )}

          {songs.map((song, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-800">{song.name}</span>
              </div>

              <button className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded">
                Action
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
