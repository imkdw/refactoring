import { addMonths, getDate } from "date-fns";

export class PayData {
  static builder(): PayDataBuilder {
    return new PayDataBuilder(null, new Date(), 0);
  }

  constructor(
    private _firstBillingDate: Date | null,
    private _billingDate: Date,
    private _payAmount: number
  ) {}

  getFirstBillingDate(): Date | null {
    return this._firstBillingDate;
  }

  getBillingDate(): Date {
    return this._billingDate;
  }

  getPayAmount(): number {
    return this._payAmount;
  }
}

class PayDataBuilder {
  constructor(
    private _firstBillingDate: Date | null,
    private _billingDate: Date,
    private _payAmount: number
  ) {}

  firstBillingDate(value: Date): PayDataBuilder {
    this._firstBillingDate = value;
    return this;
  }

  billingDate(value: Date): PayDataBuilder {
    this._billingDate = value;
    return this;
  }

  payAmount(value: number): PayDataBuilder {
    this._payAmount = value;
    return this;
  }

  build(): PayData {
    return new PayData(
      this._firstBillingDate,
      this._billingDate,
      this._payAmount
    );
  }
}

export class ExpiryDateCalculator {
  calculateExpiryDate(payData: PayData): Date {
    let addedMonths = payData.getPayAmount() / 10000;
    if (payData.getFirstBillingDate()) {
      const candidateExp = addMonths(payData.getBillingDate(), addedMonths);
      if (getDate(payData.getFirstBillingDate()!) !== getDate(candidateExp)) {
        if (getDate(payData.getFirstBillingDate()!) !== getDate(candidateExp)) {
          candidateExp.setDate(getDate(payData.getFirstBillingDate()!));
          return candidateExp;
        }
      }
    }

    const expiryDate = addMonths(payData.getBillingDate(), addedMonths);
    return expiryDate;
  }
}
