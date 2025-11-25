import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, UserPlus } from 'lucide-react'; // 아이콘 임포트
import { useHttp } from '../hooks/useHttp'; // 경로에 맞게 수정해주세요

import { validate } from '../utils/validate';

// Component
import Input from '../Components/Input';
import Button from '../Components/Button';

const SignupPage = () => {
  const navigate = useNavigate();

  // useHttp 훅 가져오기
  const { sendRequest, isLoading, error } = useHttp();

  // 폼 데이터 (이름, 이메일, 비밀번호)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // validtion에러
  const [errors, setErrors] = useState({});

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사 (빈값 체크)
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 서버로 회원가입 요청 전송
    const result = await sendRequest(
      'http://localhost:8080/signup',
      'POST',
      formData
    );

    // 성공 시 처리
    if (result) {
      alert("회원가입이 성공적으로 완료되었습니다! 로그인 페이지로 이동합니다.");
      // 로그인 페이지로 이동
      navigate('/login');
    }
  };

  // 공통 인풋 스타일 (모던 스탠다드 스타일 적용)
  const inputStyle = "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-200";

  return (
    // 전체 화면 중앙 정렬 컨테이너
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md border border-gray-200 bg-white p-8 shadow-sm rounded-xl"
      >
        {/* 상단 헤더 영역 */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-black text-white rounded-lg">
            <Package size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="text-gray-500 text-sm mt-2">
            서비스 사용을 위해 필요한 정보를 입력해주세요.
          </p>
        </div>

        {/* 입력 필드 영역 */}
        <div className="flex flex-col gap-4 mb-6">
          {/* 이름 입력 */}
          <Input
            label="이름"
            name="name"
            type="text"
            placeholder="홍길동"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* 이메일 입력 */}
          <Input
            label="이메일"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* 비밀번호 입력 */}
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="8자 이상 입력"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            className="mt-4"
          />
        </div>
         {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* 회원가입 버튼 */}
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="가입 처리 중..."
          className="mt-6"
        >
          <UserPlus size={18} />
          회원가입 완료
        </Button>

        {/* 로그인 페이지로 돌아가는 링크 (오른쪽 정렬) */}
        <div className="mt-6 flex w-full justify-end text-sm">
          <span className="text-gray-500 mr-2">이미 계정이 있으신가요?</span>
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            로그인 하러 가기
          </Link>
        </div>

      </form>
    </div>
  );
};

export default SignupPage;