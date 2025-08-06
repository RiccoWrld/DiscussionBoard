import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <header className="header">
        <h1>📌 Posts App</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
