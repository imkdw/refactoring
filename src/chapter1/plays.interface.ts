export interface Play {
  name: string;
  type: string;
}

export interface Plays {
  [key: string]: Play;
}
