import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Pages
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import MainPage from './Pages/MainPage';

// component
import DashboardContent from './Components/MainPage/Dashboard';

// contextProvider
import { AuthContextProvider } from './store/auth-context';


// --- 4. 라우터 설정 ---
export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* (A) 로그인 페이지: 레이아웃 없이 깡통으로 보여줌 */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* (B) 메인 관리자 페이지: MainLayout 안에서 내용만 바꿔 끼움 */}
          <Route element={<MainPage />}>
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/inventory" element={<div>재고 관리 페이지</div>} />
          </Route>

        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}