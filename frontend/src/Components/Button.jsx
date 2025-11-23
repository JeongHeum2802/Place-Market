import React from 'react';

const Button = ({ 
  children,           // 버튼 안에 들어갈 내용 (텍스트, 아이콘 등)
  type = 'button',    // 기본값은 button (submit 필요 시 prop으로 전달)
  isLoading = false,  // 로딩 상태
  loadingText = '처리 중...', // 로딩 시 뜰 텍스트 (기본값 설정)
  className = '',     // 추가 스타일 (margin 등)
  disabled,           // 외부에서 강제로 비활성화할 때 사용
  ...props            // onClick 등 나머지 속성 전달
}) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled} // 로딩 중이거나 비활성화면 클릭 불가
      className={`
        w-full flex justify-center items-center gap-2 py-3 
        text-sm font-bold text-white rounded-lg transition duration-200
        ${(isLoading || disabled)
          ? 'bg-gray-400 cursor-not-allowed' // 비활성화 스타일
          : 'bg-black hover:bg-gray-800'     // 기본 스타일 (검정)
        }
        ${className} 
      `}
      {...props}
    >
      {/* 로딩 중이면 loadingText, 아니면 원래 내용 보여줌 */}
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button;