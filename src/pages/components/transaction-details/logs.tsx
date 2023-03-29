import { Receipt } from '@/types';
import { Card, Descriptions } from 'antd';

export type LogsProps = { receipt: Receipt | undefined };

const Logs = ({ receipt }: LogsProps) => {
  return (
    <>
      {receipt?.logs.map((log) => (
        <>
          <Card>
            <Descriptions size="small" column={1}>
              <Descriptions.Item
                label="Address"
                labelStyle={{ width: '25%' }}
              >
                {log.address}
              </Descriptions.Item>
              <Descriptions.Item
                label="Topics"
                labelStyle={{ width: '25%' }}
              >
                <pre>
                  {log.topics.map((topic, index) => (
                    <>
                      {`[${index}]${topic}`}
                      <br />
                    </>
                  ))}
                </pre>
              </Descriptions.Item>
              <Descriptions.Item
                label="Data"
                labelStyle={{ width: '25%' }}
              >
                {log.data}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      ))}
    </>
  );
};

export default Logs;
