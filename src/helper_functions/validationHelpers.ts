/**
 * Basic Dutch IBAN validation
 * Future Enhancement: Enhance this function to cater for IBANs from all countries
 * @param  {string} accountNumber Account number
 * @return {boolean} Returns true if the account number is a valid Dutch IBAN, otherwise false
 */
export const validateIBAN = (accountNumber: string): boolean => {
    const dutchIbanRegex = /^NL\d{2}[A-Z]{4}\d{10}$/;
    return dutchIbanRegex.test(accountNumber);
};

/**
 * Validate whether a transaction reference is unique in list of transactions references
 * @param  {number[]} transactionReferenceList Array of transaction references
 * @param  {number} transactionReferenceToCheck Transaction reference to check against the list
 * @return {number} Returns the instance count for a give tranasction reference
 */
export const validateUniqueTransactionReference = (transactionReferenceList: number[], transactionReferenceToCheck: number): number => {
    return transactionReferenceList.filter(transactionReference => transactionReference === transactionReferenceToCheck).length;
};

/**
 * Validate whether the provided value is a valid number
 * @param  {unknown} valueToValidate Value to validate, unknown because the data type is not known at this point.
 * @return {boolean} Returns true if the value is a valid number, otherwise false
 */
export const validateDataIntegrityNumericalFields = (valueToValidate: unknown): boolean => {
    return typeof valueToValidate === 'number' && !isNaN(valueToValidate) && isFinite(valueToValidate);
};

/**
 * Validate whether the end balance is calculated correctly
 * @param  {number} startBalance Start Balance
 * @param  {number} mutation End Balance
 * @param  {number} endBalance End Balance
 * @return {boolean} Returns true if the end balance is calculated correctly, otherwise false
 */
export const validateTrancactionEndBalance = (startBalance: number, mutation: number, endBalance: number): boolean => {
    const calculatedEndBalance = startBalance + mutation;
    const epsilon = 0.001; // This value can be adjusted as needed for granular control
    return Math.abs(calculatedEndBalance - endBalance) < epsilon;
};