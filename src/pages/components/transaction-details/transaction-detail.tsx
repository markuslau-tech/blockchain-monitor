import React, { useEffect, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Overview from './overview';
import { Block, Receipt, Transaction } from '@/types';
import Logs from './logs';
import Loading from '../loading';
import { useRouter } from 'next/router';
import BlockchainClient from '@/blockchain-client/blockchain-client';

export default function TransactionDetail(
  token: string,
  nodeUrl: string
) {
  const client = useMemo(
    () => new BlockchainClient(token, nodeUrl),
    [token, nodeUrl]
  );

  const router = useRouter();
  const hash = router.query.hash as string;

  const [currentHeight, setCurrentHeight] = useState(0);
  const [block, setBlock] = useState<Block>();
  const [transaction, setTransaction] = useState<Transaction>();
  const [receipt, setReceipt] = useState<Receipt>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.getTransaction(hash).then((tx) => setTransaction(tx));
    client.getTransactionReceipt(hash).then((r) => setReceipt(r));
  }, [client, hash]);

  useEffect(() => {
    client
      .getBlock(
        parseInt(transaction?.blockNumber as unknown as string)
      )
      .then((block) => setBlock(block));
    client
      .getBlockNumber()
      .then((currentHeight) => setCurrentHeight(currentHeight));
  }, [client, transaction]);

  useEffect(() => {
    if (!!(block && transaction && receipt)) setIsLoading(false);
  }, [block, transaction, receipt]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Overview`,
      children: (
        <Overview
          currentHeight={currentHeight}
          block={block}
          transaction={transaction}
        />
      ),
    },
    {
      key: '2',
      label: `Logs(${receipt?.logs.length || 0})`,
      children: <Logs receipt={receipt} />,
    },
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
}
