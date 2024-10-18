import Transaction from "../interfaces/Transaction";
import ValidationError from "../interfaces/ValidationError";
import {
    validateIBAN,
    validateUniqueTransactionReference,
    validateDataIntegrityNumericalFields,
    validateTrancactionEndBalance
} from "./validationHelpers";

/**
 * Validates a list of Transaction objects with helper functions
 * @param  {Transaction[]} transactionList Array of Transaction objects
 * @return {ValidationError[]} Array of ValidationError objects
 */
const validateTransactionsPerFile = (transactionList: Transaction[]): ValidationError[] => {
    const validationErrors: ValidationError[] = [];

    transactionList.forEach((transaction: Transaction) => {
        const errorsForTransaction: string[] = [];

        if (!validateIBAN(transaction.accountNumber)) {
            errorsForTransaction.push("Invalid Dutch IBAN provided.");
        }

        // Track whether the end balance can be verified. If any numerical fields are invalid, there is no point in verifying the end balance
        let endBalanceCheckFailure: boolean = false;

        const transactionReferenceList: number[] = transactionList.map(item => item.transactionReference);
        const duplicateTransactionCount = validateUniqueTransactionReference(transactionReferenceList, transaction.transactionReference);
        if (duplicateTransactionCount > 1) {
            errorsForTransaction.push(`Transaction Reference is not unique. ${duplicateTransactionCount} transactions found with the same reference`);
        }

        if (!validateDataIntegrityNumericalFields(transaction.startBalance)) {
            endBalanceCheckFailure = true;
            errorsForTransaction.push("Start balance is not a valid numerical value.");
        }

        if (!validateDataIntegrityNumericalFields(transaction.mutation)) {
            endBalanceCheckFailure = true;
            errorsForTransaction.push("Mutation is not a valid numerical value.");
        }

        if (!validateDataIntegrityNumericalFields(transaction.endBalance)) {
            endBalanceCheckFailure = true;
            errorsForTransaction.push("End Balance is not a valid numerical value.");
        }

        if (!endBalanceCheckFailure) {
            if (!validateTrancactionEndBalance(transaction.startBalance, transaction.mutation, transaction.endBalance)) {
                errorsForTransaction.push("End Balance is not accurately calculated.");
            }
        }

        if (validationErrors.some(error => error.transactionReference === transaction.transactionReference)) {
            const existingValidationError = validationErrors.find(error => error.transactionReference === transaction.transactionReference);
            existingValidationError?.validationErrors.push(...errorsForTransaction);
        } else {
            const valiationErrorForTransaction: ValidationError = {
                transactionReference: transaction.transactionReference,
                validationErrors: errorsForTransaction
            };
            validationErrors.push(valiationErrorForTransaction);
        }
    });

    const uniqueValidationErrors: ValidationError[] = validationErrors
        .filter(item => item.validationErrors.length > 0)
        .map((item) => {
            const uniqueValidationErrors = item.validationErrors.reduce((tempArray: string[], value: string) => {
                if (!tempArray.includes(value)) {
                    tempArray.push(value);
                }
                return tempArray;
            }, []);

            return {...item, validationErrors: uniqueValidationErrors};
        });

    return uniqueValidationErrors;
};

export default validateTransactionsPerFile;