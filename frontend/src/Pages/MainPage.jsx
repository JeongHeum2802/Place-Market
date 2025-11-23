import { useNavigate, Outlet } from 'react-router-dom';

// component
import Sidebar from '../Components/MainPage/Sidebar';
import Header from '../Components/MainPage/Header';

// --- 2. 메인 레이아웃 (사이드바 + 헤더가 있는 틀) ---
const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-white text-gray-900">
      {/* 사이드바 */}
      <Sidebar />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* ★ 여기가 핵심! 주소에 따라 바뀌는 내용이 여기에 들어옵니다 ★ */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default MainLayout;