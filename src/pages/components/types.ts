export type MarketPrice = {
  quoteVolume: number;
  lastPrice: number;
  priceChangePercent: number;
};

export type Block = {
  number: number;
  hash: string;
};

export type Transaction = {
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
};
