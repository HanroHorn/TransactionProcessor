import FileInfo from "./FileInfo";

interface FileUploadHistoryProps {
    uploadedFiles: FileInfo[];
    transactionsValidated: boolean;
    busyValidating: boolean;
    transactionCount: number;
    validateTransactions: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default FileUploadHistoryProps;