import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

const Navbar = () => {
  const items = [
    { path: '/', label: 'Home' },
    { path: '/eth', label: 'Ethereum' },
    { path: '/bsc', label: 'Binance Smart Chain' },
  ];
  return (
    <Menu theme="dark" mode="horizontal">
      {items.map((item) => {
        return (
          <Menu.Item key={item.label}>
            <Link href={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
export default Navbar;
