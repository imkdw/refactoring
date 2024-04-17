import { PasswordStrengthMeter } from "../../chap02/PasswordStrengthMeter";
import { PasswordStrength } from "../../chap02/PasswordStrength.enum";

describe("PasswordStrengthMeterTest", () => {
  const meter = new PasswordStrengthMeter();

  /**
   * Strength를 비교하는 공통 expect 함수
   * @param password - 비밀번호
   * @param expected - 강도
   */
  const assertStrength = (password: string | null, expected: PasswordStrength) => {
    const result = meter.meter(password as string);
    expect(result).toBe(expected);
  };

  it("meetsAllCriteria_Then_Strong", () => {
    /**
     * 모든 조건을 만족하는 경우 STRONG을 반환한다
     */
    assertStrength("ab12!@AB", PasswordStrength.STRONG);
    assertStrength("abc1!Add", PasswordStrength.STRONG);
  });

  it("meetsOtherCriteria_except_for_Length_Then_Normal", () => {
    /**
     * 길이가 8자 미만인 경우 NORMAL을 반환한다
     */
    assertStrength("ab12!@A", PasswordStrength.NORMAL);
  });

  it("meetsOtherCriteria_except_for_Number_Then_Normal", () => {
    /**
     * 숫자포함 조건만 만족하지 않는 경우 NORMAL을 반환한다
     */
    assertStrength("ab!@ABqwer", PasswordStrength.NORMAL);
    assertStrength("abcd!@AB", PasswordStrength.NORMAL);
  });

  it("nullInput_Then_Invalid", () => {
    /**
     * null인 경우 INVALID를 반환한다
     */
    assertStrength(null, PasswordStrength.INVALID);
  });

  it("emptyInput_Then_Invalid", () => {
    /**
     * 빈 문자열인 경우 INVALID를 반환한다
     */
    assertStrength("", PasswordStrength.INVALID);
  });

  it("meetsOtherCriteria_except_for_Uppercase_Then_Normal", () => {
    /**
     * 대문자 포함 조건만 만족하지 않는 경우 NORMAL을 반환한다
     */
    assertStrength("ab12!@df", PasswordStrength.NORMAL);
  });

  it("meetsOnlyLengthCriteria_Then_Weak", () => {
    /**
     * 길이만 만족하는 경우 NORMAL을 반환한다
     */
    assertStrength("abdefghi", PasswordStrength.WEAK);
  });

  it("meetsOnlyNumberCriteria_Then_Weak", () => {
    /**
     * 숫자포함 조건만 만족하는 경우 WEAK를 반환한다
     */
    assertStrength("12345", PasswordStrength.WEAK);
  });

  it("meetsOnlyUppercaseCriteria_Then_Weak", () => {
    /**
     * 대문자 포함 조건만 만족하는 경우 WEAK를 반환한다
     */
    assertStrength("ABZ", PasswordStrength.WEAK);
  });

  it("meetsNoCriteria_Then_Weak", () => {
    /**
     * 어떤 조건도 만족하지 않는 경우 WEAK를 반환한다
     */
    assertStrength("abc", PasswordStrength.WEAK);
  });
});
