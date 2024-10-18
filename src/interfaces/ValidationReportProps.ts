import ValidationError from "./ValidationError";

interface ValidationReportProps {
    validationErrors: ValidationError[];
    transactionsValidated: boolean;
    transactionCount: number;
}

export default ValidationReportProps;