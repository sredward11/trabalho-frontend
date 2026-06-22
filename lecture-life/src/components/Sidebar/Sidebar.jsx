import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navLinkClass = ({ isActive }) => {
    const base = 'flex items-center px-4 py-2 rounded-md transition-colors font-medium ';

    return isActive
      ? base + 'bg-[#5c4033] text-white'
      : base + 'text-[#5c4033] hover:bg-[#d7ccc8] hover:text-[#3e2723]';
  };

  return (
    <aside className="flex flex-col gap-6 w-[240px] bg-white border-r border-[#d7ccc8] p-5 min-h-screen">
      <header className="flex items-center gap-2 border-b border-[#d7ccc8] pb-4">
        <span className="text-xl font-bold text-[#5c4033]">📚 LectureLife</span>
      </header>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/livros" className={navLinkClass}>
              Livros
            </NavLink>
          </li>
          <li>
            <NavLink to="/leituras" className={navLinkClass}>
              Leituras
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;