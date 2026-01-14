import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="h-[var(--navbar-height)] flex items-center bg-gray-800 p-4 text-white shadow-lg">
      <h1 className="text-xl font-semibold">
        <Link to="/">Eurostat Birds</Link>
      </h1>
    </header>
  );
}
