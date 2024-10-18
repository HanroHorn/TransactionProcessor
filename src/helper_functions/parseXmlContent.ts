import Transaction from "../interfaces/Transaction";
import {XMLParser} from "fast-xml-parser";

interface Record {
  reference: string;
  accountNumber: string;
  startBalance: string;
  endBalance: string;
  mutation: string;
  description: string;
}

/**
 * Parses specifically xml content into a list of Transaction objects
 * @param  {string} fileContent String of content to parse
 * @return {Transaction[]} List of Transaction objects
 */
const parseXmlContent = (fileContent: string): Transaction[] => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });
  const parsedXml = parser.parse(fileContent);

  const parsedContent: Transaction[] = parsedXml.records.record.map((row: Record) => ({
    transactionReference: parseInt(row.reference),
    accountNumber: row.accountNumber,
    startBalance: parseFloat(row.startBalance),
    endBalance: parseFloat(row.endBalance),
    mutation: parseFloat(row.mutation),
    description: row.description
  }));

  return parsedContent.filter(item => !isNaN(item.transactionReference));
}

export default parseXmlContent;