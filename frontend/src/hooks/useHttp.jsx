// sendRequest(url, method, body) 로 요청을 보낸다.
// 결과값은 data
// 에러메세지는 error

import { useState } from 'react';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // 응답 데이터 저장용

  // 실행 함수: 어떤 요청이든 받을 수 있도록 유연하게 만듭니다.
  const sendRequest = async (url, method = 'GET', body = null) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // fetch 옵션 설정
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || '요청 처리에 실패했습니다.');
      }

      setData(resData); // 상태에 저장
      return resData;   // 결과 반환 (필요한 경우 즉시 사용)

    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRequest, isLoading, error, data };
};