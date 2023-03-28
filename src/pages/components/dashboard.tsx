import React from 'react';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { MarketPrice, Transaction } from './types';
import { ColumnsType } from 'antd/es/table/interface';

type DashboardProps = {
  price: MarketPrice;
  currentHeight: number;
  transactions: Transaction[];
};

const txColumns: ColumnsType<Transaction> = [
  {
    title: 'Transaction Hash',
    dataIndex: 'hash',
    key: 'hash',
    ellipsis: true,
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

const Dashboard = ({
  price,
  currentHeight,
  transactions,
}: DashboardProps) => {
  return (
    <>
      {' '}
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Price"
              value={price.lastPrice}
              precision={2}
              valueStyle={{
                color:
                  price.priceChangePercent > 0
                    ? '#3f8600'
                    : '#cf1322',
              }}
              prefix={
                price.priceChangePercent > 0 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix={`USD (${price.priceChangePercent}%)`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Quote Volume"
              value={price.quoteVolume}
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
          <Table
            dataSource={transactions}
            columns={txColumns}
            size="small"
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
