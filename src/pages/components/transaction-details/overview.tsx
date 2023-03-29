import { Block, Transaction } from '@/types';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, Descriptions, Tag, Tooltip } from 'antd';

export type OverviewProps = {
  currentHeight: number | undefined;
  transaction: Transaction | undefined;
  block: Block | undefined;
};

const Overview = ({
  currentHeight,
  transaction,
  block,
}: OverviewProps) => {
  return (
    <>
      <Card title="Transaction Overview" bordered={false}>
        <Descriptions size="small" column={1}>
          <Descriptions.Item
            label="Transaction Hash"
            labelStyle={{ width: '25%' }}
          >
            {transaction?.hash}
          </Descriptions.Item>
          <Descriptions.Item
            label="Status"
            labelStyle={{ width: '25%' }}
          >
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </Descriptions.Item>
          <Descriptions.Item
            label="Block"
            labelStyle={{ width: '25%' }}
          >
            {parseInt(transaction?.blockNumber as string)}{' '}
            <Tag>{`Comfirmations: ${
              (currentHeight as number) -
              parseInt(transaction?.blockNumber as string)
            }`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label="Timestamp"
            labelStyle={{ width: '25%' }}
          >
            {new Date(
              parseInt(block?.timestamp as string) * 1000
            ).toUTCString()}
          </Descriptions.Item>
          <Descriptions.Item
            label="From"
            labelStyle={{ width: '25%' }}
          >
            {transaction?.from}
          </Descriptions.Item>
          <Descriptions.Item label="To" labelStyle={{ width: '25%' }}>
            {transaction?.to}
          </Descriptions.Item>
          <Descriptions.Item
            label="Value"
            labelStyle={{ width: '25%' }}
          >
            {parseInt(transaction?.value as string) * 1e-18} ETH
          </Descriptions.Item>
          <Descriptions.Item
            label="Transaction Fee"
            labelStyle={{ width: '25%' }}
          >
            <Tooltip title="Gas Price * Gas">
              {parseInt(transaction?.gasPrice as string) *
                parseInt(transaction?.gas as string) *
                1e-18}{' '}
              ETH
            </Tooltip>
          </Descriptions.Item>
        </Descriptions>{' '}
      </Card>
    </>
  );
};

export default Overview;
