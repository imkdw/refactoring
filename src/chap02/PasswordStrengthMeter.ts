import { PasswordStrength } from "./PasswordStrength.enum";

export class PasswordStrengthMeter {
  meter(password: string): PasswordStrength {
    if (!password) return PasswordStrength.INVALID;

    let meetCount = this.getMeetCriteriaCounts(password);

    if (meetCount <= 1) return PasswordStrength.WEAK;
    if (meetCount === 2) return PasswordStrength.NORMAL;

    return PasswordStrength.STRONG;
  }

  private getMeetCriteriaCounts(password: string): number {
    let meetCount = 0;

    if (password.length >= 8) meetCount++;
    if (this.meetsContainingNumberCriteria(password)) meetCount++;
    if (this.meetsContainingUppercaseCriteria(password)) meetCount++;

    return meetCount;
  }

  private meetsContainingNumberCriteria(password: string): boolean {
    let containsNum = false;
    for (let i = 0; i < password.length; i++) {
      if (0 <= parseInt(password[i], 10) && parseInt(password[i], 10) <= 9) {
        containsNum = true;
        break;
      }
    }
    return containsNum;
  }

  private meetsContainingUppercaseCriteria(password: string): boolean {
    let containsUpp = false;
    for (let i = 0; i < password.length; i++) {
      if ("A" <= password[i] && password[i] <= "Z") {
        containsUpp = true;
        break;
      }
    }
    return containsUpp;
  }
}
