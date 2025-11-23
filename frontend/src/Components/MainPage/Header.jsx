import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
      <h2 className="font-bold">대시보드</h2>
      <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-black flex items-center gap-1">
        <LogOut size={16} /> 로그아웃
      </button>
    </header>
  );
};

export default Header;