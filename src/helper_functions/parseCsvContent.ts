import Papa from 'papaparse';
import PapaParseCsvTransaction from "../interfaces/PapaParseCsvTransaction";
import Transaction from '../interfaces/Transaction';

/**
 * Parses specifically csv content into a list of Transaction objects
 * @param  {string} fileContent String of content to parse
 * @return {Transaction[]} List of Transaction objects
 */
const parseCsvContent = (fileContent: string): Transaction[] => {
    const mapCsvHeaders = (row: any): Transaction => {
        return {
            transactionReference: parseInt(row['Reference']),
            accountNumber: row['Account Number'],
            startBalance: parseFloat(row['Start Balance']),
            endBalance: parseFloat(row['End Balance']),
            mutation: parseFloat(row['Mutation']),
            description: row['Description']
        };
    };
    const parsedContent: PapaParseCsvTransaction[] = Papa.parse<PapaParseCsvTransaction>(fileContent, { header: true, skipEmptyLines: true }).data;
    return parsedContent.map(row => mapCsvHeaders(row)).filter(item => !isNaN(item.transactionReference));
}

export default parseCsvContent;