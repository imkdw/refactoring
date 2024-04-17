import {
  ExpiryDateCalculator,
  PayData,
} from "../../chap03/ExpiryDateCalculator";

describe("ExpiryDateCalculatorTest", () => {
  const assertExpiryDate = (payData: PayData, expectedExpiryDate: Date) => {
    const cal = new ExpiryDateCalculator();
    const realExpiryDate = cal.calculateExpiryDate(payData);
    expect(realExpiryDate).toEqual(expectedExpiryDate);
  };

  it("만원을 납부하면 한달 뒤가 만료일이 됨", () => {
    assertExpiryDate(
      PayData.builder()
        .billingDate(new Date("2021-03-01"))
        .payAmount(10000)
        .build(),
      new Date("2021-04-01")
    );

    assertExpiryDate(
      PayData.builder()
        .billingDate(new Date("2021-05-01"))
        .payAmount(10000)
        .build(),
      new Date("2021-06-01")
    );
  });

  it("납부일과 한달 뒤 일자가 같지 않음", () => {
    assertExpiryDate(
      PayData.builder()
        .billingDate(new Date("2021-05-31"))
        .payAmount(10000)
        .build(),
      new Date("2021-06-30")
    );

    assertExpiryDate(
      PayData.builder()
        .billingDate(new Date("2019-01-31"))
        .payAmount(10000)
        .build(),
      new Date("2019-02-28")
    );
  });

  it("첫 납부일과 만료일 일자가 다를때 만원 납부", () => {
    const payData = PayData.builder()
      .firstBillingDate(new Date("2019-01-31"))
      .billingDate(new Date("2019-02-28"))
      .payAmount(10000)
      .build();

    assertExpiryDate(payData, new Date("2019-03-31"));

    const payData2 = PayData.builder()
      .firstBillingDate(new Date("2019-01-30"))
      .billingDate(new Date("2019-02-28"))
      .payAmount(10000)
      .build();

    assertExpiryDate(payData2, new Date("2019-03-30"));

    const payData3 = PayData.builder()
      .firstBillingDate(new Date("2019-05-31"))
      .billingDate(new Date("2019-06-30"))
      .payAmount(10000)
      .build();

    assertExpiryDate(payData3, new Date("2019-07-31"));
  });

  it("이만원 이상 납부하면 비례해서 만료일 계산", () => {
    assertExpiryDate(
      PayData.builder()
        .billingDate(new Date("2019-03-01"))
        .payAmount(20000)
        .build(),
      new Date("2019-05-01")
    );

    assertExpiryDate(
      PayData.builder()
        .billingDate(new Date("2019-03-01"))
        .payAmount(30000)
        .build(),
      new Date("2019-06-01")
    );
  });
});
