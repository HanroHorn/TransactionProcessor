import Papa from 'papaparse';

/**
 * Basic XML validation to check whether the file content contains the expected xml tags
 * Future Enhancement: Improve the method to provide more in-depth structure validation
 * @param  {string} content String of content
 * @return {boolean} Returns true if the content contains the expect tags and starts with the correct tag, otherwise false
 */
export const validateXmlStructure = (content: string): boolean => {
    const requiredXmlTags = ["records", "record", "accountNumber", "description", "startBalance", "mutation", "endBalance"];
    const containsRequiredTags = requiredXmlTags.every(tag => content.includes(tag));
    const startsWithExpectedHeader = content.trim().startsWith("<records>");

    return containsRequiredTags && startsWithExpectedHeader;
};

/**
 * Basic CSV validation to check whether the file content contains the expected headers
 * @param  {string} content String of content
 * @return {boolean} Returns true if the content contains the expect headers, otherwise false
 */
export const validateCsvStructure = (content: string): boolean => {
    const requiredHeaders = ['Reference', 'Account Number', 'Start Balance', 'End Balance', 'Mutation', 'Description'];
    const parsedData = Papa.parse(content, { header: true });
    const headers = parsedData.meta.fields;
    const data = parsedData.data;

    if (headers && headers.length > 0 && data.length > 0) {
        return requiredHeaders.every(column => headers.includes(column));
    }

    return false;
};

/**
 * Validate file content based on the extension type
 * @param  {string} fileExtension File extension
 * @param  {string} content File content
 * @return {boolean} Returns true if the content conforms to the expected MT940 format, otherwise false
 */
export const validateMT940FileStructure = (fileExtension: string | undefined, content: string): boolean => {
    if (fileExtension === 'xml') {
        console.log('Calling validateXmlStructure');
        return validateXmlStructure(content);
    } else if (fileExtension === 'csv') {
        console.log('Calling validateCsvStructure');
        return validateCsvStructure(content);
    }

    return false;
};