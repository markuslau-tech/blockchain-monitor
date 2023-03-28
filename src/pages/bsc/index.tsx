import {
  getLatestBlock,
  getMarketPrice,
} from '@/blockchain-client/bsc';
import { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import Loading from '../components/loading';

export default function BinanceSmartChain() {
  const [loading, setLoading] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [price, setPrice] = useState({
    quoteVolume: 0,
    lastPrice: 0,
    priceChangePercent: 0,
  });
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    setLoading(true);

    getMarketPrice().then((price) => setPrice(price));

    getLatestBlock().then((block) => {
      setCurrentHeight(parseInt(block.number));
      setTxs(block.transactions.reverse());
      setLoading(false);
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
