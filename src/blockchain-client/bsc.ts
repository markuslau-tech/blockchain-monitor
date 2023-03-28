import {
  Block,
  MarketPrice,
  Transaction,
} from '@/pages/components/types';
import BlockchainClient from './blockchain-client';
import { request } from './evm';

export default class BinanceSmartChainClient
  implements BlockchainClient
{
  private source: string = 'https://bsc-dataseed.binance.org/';

  async getMarketPrice(): Promise<MarketPrice> {
    const res = await fetch(
      'https://api.binance.com/api/v3/ticker/24hr?symbol=BNBUSDT'
    );
    return await res.json();
  }

  async getBlockNumber(): Promise<number> {
    const { result } = await request(this.source, 'eth_blockNumber');
    return parseInt(result);
  }

  async getBlock(blockNumber: number): Promise<Block> {
    const { result } = await request(
      this.source,
      'eth_getBlockByNumber',
      [`0x${blockNumber.toString(16)}`, true]
    );
    return result;
  }

  async getTransaction(hash: string): Promise<Transaction> {
    const { result } = await request(
      this.source,
      'eth_getTransactionByHash',
      [hash]
    );

    return result;
  }
}
