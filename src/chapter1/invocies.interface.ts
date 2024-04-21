import { Play } from "./plays.interface";

export interface Performance {
  playID: string;
  audience: number;
  play?: Play;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}
