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
