import { Link } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-800 text-white p-3">
        <div className="container mx-auto">
          <Link to="/" className="mr-4">
            List song
          </Link>
          <Link to="/editor">Editor</Link>
        </div>
      </nav>
      <main className="p-4">{children}</main>
      <div className="fixed"></div>
    </div>
  );
}
