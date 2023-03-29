import { Block, MarketPrice, Receipt, Transaction } from '@/types';

export default class BlockchainClient {
  private source: string;
  private nodeUrl: string;

  constructor(token: string, nodeUrl: string) {
    this.source = `https://api.binance.com/api/v3/ticker/24hr?symbol=${token}USDT`;
    this.nodeUrl = nodeUrl;
  }

  async getMarketPrice(): Promise<MarketPrice> {
    const res = await fetch(this.source);
    return await res.json();
  }

  async getBlockNumber(): Promise<number> {
    const { result } = await this.request('eth_blockNumber');
    return parseInt(result);
  }

  async getBlock(blockNumber: number): Promise<Block> {
    const { result } = await this.request('eth_getBlockByNumber', [
      `0x${blockNumber.toString(16)}`,
      true,
    ]);
    return result;
  }

  async getTransaction(hash: string): Promise<Transaction> {
    const { result } = await this.request(
      'eth_getTransactionByHash',
      [hash]
    );

    return result;
  }

  async getTransactionReceipt(hash: string): Promise<Receipt> {
    const { result } = await this.request(
      'eth_getTransactionReceipt',
      [hash]
    );

    return result;
  }

  private async request(method: string, params: any[] = []) {
    const res = await fetch(this.nodeUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        method,
        params,
        id: 1,
        jsonrpc: '2.0',
      }),
    });

    return res.json();
  }
}
