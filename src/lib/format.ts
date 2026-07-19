/** 숫자를 "1억 2,300만원" 형태의 한국식 금액 표기로 변환 (만원 단위로 반올림) */
export function formatKoreanCurrency(amountWon: number): string {
  if (!Number.isFinite(amountWon)) return "-";

  const rounded = Math.round(amountWon / 10_000) * 10_000;
  const sign = rounded < 0 ? "-" : "";
  const abs = Math.abs(rounded);

  const eok = Math.floor(abs / 100_000_000);
  const man = Math.floor((abs % 100_000_000) / 10_000);

  if (eok === 0 && man === 0) return "0원";

  let result = sign;
  if (eok > 0) result += `${eok.toLocaleString("ko-KR")}억 `;
  if (man > 0) {
    result += `${man.toLocaleString("ko-KR")}만원`;
  } else if (eok > 0) {
    result += "원";
  }
  return result.trim();
}

/** 숫자를 "3,000,000원" 형태로 표기 */
export function formatWon(amountWon: number): string {
  if (!Number.isFinite(amountWon)) return "-";
  return `${Math.round(amountWon).toLocaleString("ko-KR")}원`;
}

/** 숫자를 "300만원" 처럼 만원 단위 정수로 표기 (입력 프리셋 라벨용) */
export function formatManwon(amountWon: number): string {
  const man = Math.round(amountWon / 10_000);
  return `${man.toLocaleString("ko-KR")}만원`;
}

/** 비율을 "12.0%" 형태로 표기 */
export function formatPercent(rate: number, digits = 1): string {
  return `${(rate * 100).toFixed(digits)}%`;
}

/** "300" 같은 만원 단위 입력 문자열을 원 단위 숫자로 변환 */
export function parseManwonInput(value: string): number {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return Math.round(numeric * 10_000);
}
