import { Link } from "react-router-dom";
import { Layout } from "../layouts";

export default function ListSong() {
  const songs = [];

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
        </div>
      </div>
    </Layout>
  );
}
