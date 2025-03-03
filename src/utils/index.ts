import { fetchData } from "../api";

// 천단위 콤마(,) 표기하는 함수
export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString("en-US");
};

// 소수 세번째 자리에서 반올림하여 % 값으로 표기하는 함수
export const formatPercentage = (num: number): string => {
  return `${(num * 100).toFixed(2)}%`;
};

// yyyy-mm-dd HH:mm:ss 형식으로 날짜 변환하는 함수
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 사용자 아이디(이메일) 유효성 검사 함수 (9-50자 이내, 중복 체크)
export const validateEmail = async (email: string): Promise<string> => {
  if (!email) {
    return "아이디(이메일)을 입력하세요.";
  }
  if (email.length < 9 || email.length > 50) {
    return "올바른 이메일 주소를 입력하세요";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "올바른 이메일 주소를 입력하세요.";
  }

  try {
    const response: { result: boolean } = await fetchData(
      `/api/users/${email}/exists`
    );
    const data = await response;
    if (!data.result) {
      return "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.";
    }
  } catch (error) {
    console.error("이메일 중복 체크 API 호출 실패", error);
    return "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.";
  }
  return "";
};

// 사용자 비밀번호 유효성 검사 함수 (영문, 숫자, 특수문자 조합 8~15자)
export const validatePassword = (password: string) => {
  if (!password) {
    return "비밀번호를 입력하세요.";
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/;

  if (!passwordRegex.test(password)) {
    return "8~15자 영문, 숫자, 특수문자를 사용하세요.";
  }

  return "";
};

// 사용자 비밀번호 확인 유효성 검사
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword) {
    return "비밀번호를 입력하세요.";
  }

  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return "";
};

// 사용자 이름 유효성 검사 함수 (한글, 영문 1~16자 입력가능, 숫자/특수문자/공백 입력 불가)
export const validateUserName = (userName: string) => {
  if (!userName) {
    return "이름을 입력하세요.";
  }
  const userNameRex = /^[A-Za-z가-힣]{1,16}$/;
  if (!userNameRex.test(userName)) {
    return "1~16자의 한글, 영문만 입력 가능합니다. (숫자, 특수문자, 공백 입력 불가)";
  }

  return "";
};
