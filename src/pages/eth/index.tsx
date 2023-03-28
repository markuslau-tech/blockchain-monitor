import EthereumClient from '@/blockchain-client/eth';
import { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import Loading from '../components/loading';
import { Transaction } from '../components/types';

export default function Ethereum() {
  const [loading, setLoading] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [price, setPrice] = useState({
    quoteVolume: 0,
    lastPrice: 0,
    priceChangePercent: 0,
  });
  const [txs, setTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    setLoading(true);

    const client = new EthereumClient();

    client.getMarketPrice().then((price) => setPrice(price));

    client.getBlockNumber().then((blockNumber) => {
      setCurrentHeight(blockNumber);
      client.getBlock(blockNumber).then((block) => {
        setTxs(block.transactions.reverse().slice(0, 10));
        setLoading(false);
      });
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Dashboard
        price={price}
        currentHeight={currentHeight}
        transactions={txs}
      />
    </>
  );
}
