const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* 1. 라벨이 있을 때만 렌더링 */}
      {label && (
        <label className="text-sm font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}

      {/* 2. Input 태그 */}
      <input
        {...props} // type, name, value, onChange 등을 한 번에 전달받음
        className={`
          w-full rounded-lg border px-4 py-3 outline-none transition duration-200
          text-gray-900 placeholder-gray-400
          ${error 
            ? 'border-red-500 focus:ring-2 focus:ring-red-200' // 에러 시 빨간 테두리
            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50' // 평소 파란 테두리
          }
          ${className} // 추가적인 스타일이 필요할 때 덮어씌움
        `}
      />

      {/* 3. 에러 메시지 (있을 때만 표시) */}
      {error && (
        <span className="text-xs text-red-500 font-medium ml-1">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;