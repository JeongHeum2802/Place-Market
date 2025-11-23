const validate = (values) => {
  const errors = {};

  // 1. 이메일 검사 (정규식 활용)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  // 2. 비밀번호 검사 (8자 이상)
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 8) {
    errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
  }

  // 3. 이름 검사 (회원가입일 경우)
  if (values.name !== undefined && !values.name.trim()) {
     errors.name = "이름을 입력해주세요.";
  }

  return errors;
};

export {validate};