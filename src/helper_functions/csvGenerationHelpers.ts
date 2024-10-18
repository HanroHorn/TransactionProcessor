import ValidationError from "../interfaces/ValidationError";

/**
 * Formats a string with the provided input
 * @param  {string} transactionReference String containing the transaction reference
 * @param  {string} validationMessage String containing the validation message
 * @return {string} Formatted string
 */
const formatCsvLine = (transactionReference: string, validationMessage: string): string => {
    return `${transactionReference},${validationMessage}`;
};

/**
 * Generates an array of strings from an array of validation error objects
 * @param  {validationError[]} validationErrors Array of ValidationError objects
 * @return {string[]} Array of validation error messages
 */
const generateCsvFileBody = (validationErrors: ValidationError[]): string[] => {
    if (validationErrors.length === 0) return [];

    return validationErrors.flatMap(validation =>
        validation.validationErrors.map(validationMessage => {
            return formatCsvLine(
                validation.transactionReference.toString(),
                validationMessage
            )
        })
    );
};

/**
 * Generates a CSV blob file from an array of validation error objects
 * @param  {validationError[]} validationErrors Array of ValidationError objects
 * @return {Blob} CSV Blob File
 */
export const generateCsvFile = (validationErrors: ValidationError[]): Blob => {
    const csvHeader = ["Transaction Reference, Validation Message"];
    const csvBody = generateCsvFileBody(validationErrors);
    const csvContent = [
        ...csvHeader,
        ...csvBody
    ];
    const formattedCsvContent = csvContent.join("\n");
    const csvBlob = new Blob([formattedCsvContent], { type: "text/csv;charset=utf-8;" });

    return csvBlob;
};