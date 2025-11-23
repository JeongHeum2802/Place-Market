import { Package, LayoutDashboard } from 'lucide-react';

const Sidebar = () => (<aside className="w-64 border-r border-gray-200 bg-white p-4 hidden md:block">
  <div className="mb-8 flex items-center gap-2 font-bold text-lg">
    <Package size={20} /> Place Market
  </div>
  <nav className="space-y-1">
    <div className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-medium">
      <LayoutDashboard size={18} /> 대시보드
    </div>
  </nav>
</aside>);

export default Sidebar;