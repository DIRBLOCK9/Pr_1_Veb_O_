import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">🤖 Variant 22 • Sensor Network API</div>
      <nav className="navbar__links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
          Головна
        </NavLink>
        <NavLink to="/sensors" className={({ isActive }) => (isActive ? "link active" : "link")}>
          Сенсори
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "link active" : "link")}>
          Налаштування
        </NavLink>
      </nav>
    </header>
  );
}
