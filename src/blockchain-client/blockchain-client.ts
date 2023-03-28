import {
  Block,
  MarketPrice,
  Transaction,
} from '@/pages/components/types';

export default interface BlockchainClient {
  getMarketPrice(): Promise<MarketPrice>;
  getBlockNumber(): Promise<number>;
  getBlock(blockNumber: number): Promise<Block>;
  getTransaction(hash: string): Promise<Transaction>;
}
