/**
 * P.29
 * 1-4 statement() 함수 쪼개기
 */

import { Invoice, Performance } from "./invocies.interface";
import { Plays } from "./plays.interface";

const statement = (invoice: Invoice, plays: Plays) => {
  const playFor = (aPerformance: Performance) => {
    return plays[aPerformance.playID];
  };

  const amountFor = (aPerformance: Performance) => {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }

    return result;
  };

  const volumeCreditsFor = (aPerformance: Performance) => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);

    return result;
  };

  const totalVolumeCredits = () => {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  };

  const usd = (aNumber: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  };

  const totalAmount = () => {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  };

  let result = `청구내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;

  return result;
};

const init = async () => {
  const invocies: Invoice = {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  };

  const plays: Plays = {
    hamlet: {
      name: "Hamlet",
      type: "tragedy",
    },
    "as-like": {
      name: "As You Like It",
      type: "comedy",
    },
    othello: {
      name: "Othello",
      type: "tragedy",
    },
  };

  const result = statement(invocies, plays);
  console.log(result);
};

init();
