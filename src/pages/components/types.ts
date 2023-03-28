export type MarketPrice = {
  quoteVolume: number;
  lastPrice: number;
  priceChangePercent: number;
};

export type Block = {
  number: number;
  hash: string;
  transactions: Transaction[];
};

export type Transaction = {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string;
  type: string;
  v: string;
  value: string;
};
