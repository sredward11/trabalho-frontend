import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f5f0eb]">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;