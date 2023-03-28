import { request } from './evm';

const source = 'https://bsc-dataseed.binance.org/';

export async function getMarketPrice() {
  const res = await fetch(
    'https://api.binance.com/api/v3/ticker/24hr?symbol=BNBUSDT'
  );
  return await res.json();
}

export async function getLatestBlockNumber(): Promise<number> {
  const { result } = await request(source, 'eth_blockNumber');
  return parseInt(result);
}

export async function getLatestBlock(): Promise<any> {
  const currentBlockNumber = await getLatestBlockNumber();
  const { result } = await request(source, 'eth_getBlockByNumber', [
    `0x${currentBlockNumber.toString(16)}`,
    true,
  ]);
  return result;
}