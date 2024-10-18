interface Transaction {
  transactionReference: number;
  accountNumber: string;
  startBalance: number;
  endBalance: number;
  mutation: number;
  description: string;
}

export default Transaction;