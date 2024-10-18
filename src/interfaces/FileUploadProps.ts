import FileInfo from "./FileInfo";
import Transaction from "./Transaction";

interface FileUploadProps {
    onAllFilesParsed: (uploadedFiles: FileInfo[], transactionsList: Transaction[]) => void;
}

export default FileUploadProps;