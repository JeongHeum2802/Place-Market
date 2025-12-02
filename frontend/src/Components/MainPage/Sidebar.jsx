import { Package, LayoutDashboard, Package2 } from 'lucide-react';

// component
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 border-r border-gray-200 bg-white p-4 hidden md:flex md:flex-col">
      <div className="mb-8 flex items-center gap-2 font-bold text-lg">
        <Package size={20} /> Place Market
      </div>
      <nav className="space-y-1">
        <SidebarItem url="/dashboard">
          <LayoutDashboard size={18} /> 대시보드
        </SidebarItem>
        <SidebarItem url="/inventory">
          <Package2 size={18} /> 재고
        </SidebarItem>
      </nav>
    </aside >)
};

export default Sidebar;