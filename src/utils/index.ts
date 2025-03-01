// 천단위 콤마(,) 표기
export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString("en-US");
};

// 소수 세번째 자리에서 반올림하여 % 값으로 표기하는 함수
export const formatPercentage = (num: number): string => {
  return `${(num * 100).toFixed(2)}%`;
};
