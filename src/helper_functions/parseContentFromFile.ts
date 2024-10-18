import FileInfo from "../interfaces/FileInfo";
import Transaction from "../interfaces/Transaction";
import parseCsvContent from "./parseCsvContent";
import parseXmlContent from "./parseXmlContent";
import { validateMT940FileStructure } from "./validateMT940FileStructure";

/**
 * Parses content from a list of files and keeps track of files uploaded and a transaction list
 * @param  {FileList} fileList List of files to parse
 * @return {Promise<{ uploadedFiles: FileInfo[], transactionList: Transaction[] }>} Promise resolving to a json object containing a list of uploaded files and a list of transactions
 */
export const parseContentFromFile = (fileList: FileList): Promise<{ uploadedFiles: FileInfo[], transactionList: Transaction[], failedUploadCount: number }> => {
    const uploadedFiles: FileInfo[] = [];
    const transactionList: Transaction[] = [];

    return new Promise((resolve) => {
        let filesProcessed = 0;
        let failedUploadCount = 0;

        Array.from(fileList).forEach((file) => {
            const fileExtension = file.name.split('.').pop();
            let transactionCountForFile = 0;

            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const fileContent = event.target?.result as string;
                const isValidFile = validateMT940FileStructure(fileExtension, fileContent);

                if (isValidFile) {
                    if (fileExtension === 'csv') {
                        const parsedCsvTransactions = parseCsvContent(fileContent);
                        transactionList.push(...parsedCsvTransactions);
                        transactionCountForFile = parsedCsvTransactions.length;
                    } else if (fileExtension === 'xml') {
                        const parsedXmlTransactions = parseXmlContent(fileContent);
                        transactionList.push(...parsedXmlTransactions);
                        transactionCountForFile = parsedXmlTransactions.length;
                    }

                    const fileData: FileInfo = {
                        fileName: file.name,
                        fileSize: [file.size, 'KB'].join(''),
                        uploadTimestamp: new Date(),
                        transactionCount: transactionCountForFile
                    };
                    uploadedFiles.push(fileData);
                } else {
                    failedUploadCount += 1;
                }
                
                filesProcessed += 1;

                if (filesProcessed === fileList.length) {
                    resolve({ uploadedFiles, transactionList, failedUploadCount });
                }
            };

            fileReader.readAsText(file);
        });
    });
}