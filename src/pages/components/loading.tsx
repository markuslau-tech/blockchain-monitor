import { Spin } from "antd";

export default function Loading() {
  return (
    <div
      style={{
        textAlign: 'center',
        margin: '20px 0',
      }}
    >
      <Spin />
    </div>
  );
}
