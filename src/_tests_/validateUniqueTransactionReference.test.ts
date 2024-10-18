import { validateUniqueTransactionReference } from "../helper_functions/validationHelpers";

describe('test validateUniqueTransactionReference function', () => {
    it('should return the count of transactions with the specified transaction reference', () => {
      const transactions: number[] = [1,2,1];
  
      const transactionsFor1 = validateUniqueTransactionReference(transactions, 1);
      const transactionsFor2 = validateUniqueTransactionReference(transactions, 2);
      const transactionsFor3 = validateUniqueTransactionReference(transactions, 3);
  
      expect(transactionsFor1).toBe(2); // Two transactions with reference 1
      expect(transactionsFor2).toBe(1); // One transaction with reference 2
      expect(transactionsFor3).toBe(0); // No transactions with reference 3
    });
  });