import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BlockchainClient from '@/blockchain-client/blockchain-client';
import Loading from './loading';
import { MarketPrice, Transaction } from '@/types';

const Dashboard = (token: string, nodeUrl: string) => {
  const client = useMemo(
    () => new BlockchainClient(token, nodeUrl),
    [token, nodeUrl]
  );

  const router = useRouter();
  const routerRoute = router.route;

  const [loading, setLoading] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [price, setPrice] = useState<MarketPrice>();
  const [txs, setTxs] = useState<Transaction[]>([]);

  const txColumns: ColumnsType<Transaction> = [
    {
      title: 'Transaction Hash',
      dataIndex: 'hash',
      key: 'hash',
      ellipsis: true,
      render: (text: string) => (
        <Link href={`${routerRoute}/${text}`}>{text}</Link>
      ),
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   render: (text: string, record: Transaction) => (
    //     <>
    //       <p style={{ margin: '0' }}>From: {record.from}</p>
    //       <p style={{ margin: '0' }}>To: {record.to}</p>
    //     </>
    //   ),
    // },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: '',
      key: 'symbol',
      render: (text: string) => <SwapRightOutlined />,
      width: 20,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      ellipsis: true,
    },
    {
      title: 'Transaction Amount (ETH)',
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      render: (text: string) => parseInt(text) * 1e-18,
    },
    {
      title: 'Transaction Fee (ETH)',
      dataIndex: 'gas',
      key: 'gas',
      align: 'right',
      render: (text: string, record: Transaction) =>
        parseInt(record.gas) * parseInt(record.gasPrice) * 1e-18,
    },
  ];

  useEffect(() => {
    setLoading(true);

    client.getMarketPrice().then((price) => setPrice(price));

    client.getBlockNumber().then((blockNumber) => {
      setCurrentHeight(blockNumber);
      client.getBlock(blockNumber).then((block) => {
        setTxs(block.transactions.reverse().slice(0, 10));
        setLoading(false);
      });
    });
  }, [client]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {' '}
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Price"
              value={price?.lastPrice}
              precision={2}
              valueStyle={{
                color:
                  price && price.priceChangePercent > 0
                    ? '#3f8600'
                    : '#cf1322',
              }}
              prefix={
                price && price.priceChangePercent > 0 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix={`USD (${price?.priceChangePercent}%)`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Quote Volume"
              value={price?.quoteVolume}
              precision={0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Current Block" value={currentHeight} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Table dataSource={txs} columns={txColumns} size="small" />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
