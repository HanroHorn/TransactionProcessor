// Core Imports
import React from "react";

// Styling Imports
import { Alert, Button, Card, Spinner, Table } from "react-bootstrap";

// Utility Imports
import FileUploadHistoryProps from "../interfaces/FileUploadHistoryProps";

const FileUploadHistory: React.FC<FileUploadHistoryProps> = ({ uploadedFiles, transactionsValidated, busyValidating, validateTransactions, transactionCount }) => {
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center CardHeader">
                <span>Uploaded Files</span>
                <Button
                    variant="primary"
                    onClick={validateTransactions}
                    disabled={uploadedFiles.length === 0 || transactionCount === 0}
                >
                    {busyValidating ? (<Spinner animation="border" role="status" aria-hidden="true" size='sm'></Spinner>) : (<span>Validate Transactions</span>)}
                </Button>
            </Card.Header>
            <Card.Body className="card-height-wrapper">
                {transactionsValidated && (
                    <Alert variant="success" dismissible>Transactions for the uploaded files successfully validated. Navigate to the validation report section to view the validation results.</Alert>
                )}
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Filename</th>
                            <th>File Size</th>
                            <th>Transaction Count</th>
                            <th>Upload Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploadedFiles.length > 0 ? (
                            <>
                                {uploadedFiles.map((item, index) => {
                                    return (
                                        <tr key={`file_row_${index}`}>
                                            <td>{item.fileName}</td>
                                            <td>{item.fileSize}</td>
                                            <td>{item.transactionCount} transactions</td>
                                            <td>{item.uploadTimestamp.toLocaleDateString()}</td>
                                        </tr>
                                    );
                                })}
                            </>) : (
                            <tr>
                                <td colSpan={5}>No files uploaded</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default FileUploadHistory;