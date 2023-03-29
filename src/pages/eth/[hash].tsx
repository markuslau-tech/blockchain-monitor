import TransactionDetail from '../components/transaction-details/transaction-detail';

const EthereumTransaction = () =>
  TransactionDetail(
    'ETH',
    'https://ethereum-mainnet-rpc.allthatnode.com'
  );

export default EthereumTransaction;
