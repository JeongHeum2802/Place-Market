import { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Package, UserPlus } from 'lucide-react';
import { useHttp } from '../hooks/useHttp';

// util
import { validate } from '../utils/validate';

// component
import Input from '../Components/Input';
import Button from '../Components/Button';

// Context
import AuthContext from '../store/auth-context';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { sendRequest, data, error, isLoading } = useHttp();

  const authCtx = useContext(AuthContext);
  
  // 폼 데이터
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // validtion에러
  const [errors, setErrors] = useState({});

  // input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 로그인 양식 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 확인
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await sendRequest('http://localhost:8080/login', 'POST', formData);

    // 로그인 성공 시 이동
    if (result) {
      authCtx.login(result.token);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md border border-gray-200 bg-white p-8 shadow-sm">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-black text-white">
            <Package size={24} />
          </div>
          <h1 className="text-2xl font-bold text-black">Place Market</h1>
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-col gap-2 py-2">
          {/* email */}
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {/* password */}
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

        </div>
        {/* 에러 메세지 */}
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-500">
            ⚠️ {error}
          </div>
        )}

        {/* 버튼 */}
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="로그인 중..."
          className="mt-6"
        >
          로그인
        </Button>
        <div className="mt-4 flex w-full justify-end">
          <Link to="/signup" className="text-sm text-gray-500 hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;