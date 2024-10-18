// Core Imports
import React, { useState } from "react";

// Styling Imports
import { Alert, Button, Card, Spinner, Stack } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";

// Utility Imports
import ValidationReportSection from "./ValidationReporSection";
import ValidationReportProps from "../interfaces/ValidationReportProps";
import { generateCsvFile } from "../helper_functions/csvGenerationHelpers";
import { downloadFile } from "../helper_functions/downloadFile";

const ValidationReport: React.FC<ValidationReportProps> = ({ validationErrors, transactionsValidated, transactionCount }) => {
    const [downloadingReport, setDownloadingReport] = useState(false);

    const downloadReport = (): void => {
        setDownloadingReport(true);

        const csvFile = generateCsvFile(validationErrors);
        downloadFile(csvFile, 'Validation_Report.csv');

        setDownloadingReport(false);
    };

    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Validation Report</span>
                <Button
                    variant="primary"
                    onClick={downloadReport}
                    disabled={validationErrors.length === 0}
                >
                    {downloadingReport ? (<Spinner animation="border" role="status" aria-hidden="true" size='sm'></Spinner>) : (<span>Download Report</span>)}
                </Button>
            </Card.Header>
            <Card.Body>
                {!transactionsValidated && (
                    <Alert variant="light">
                        <span>Click on <strong>Validate Transactions</strong> to generate a validation report for the uploaded file(s).</span>
                    </Alert>
                )}
                {transactionsValidated && validationErrors.length > 0 && (
                    <>
                        <Card.Text className='text-secondary fs-6 lead'><FaCircleInfo color='lightGray' /> Downloadable as .csv file</Card.Text>
                        <Stack gap={3}>
                            {validationErrors.map((validationError, index) => (
                                <ValidationReportSection key={`validation_section_${index}`} sectionIndex={index} validationError={validationError} />
                            ))}
                        </Stack>
                    </>
                )}
                {transactionsValidated && validationErrors.length === 0 && transactionCount > 0 && (
                    <Alert variant="light">
                        <span>All transaction passed validation</span>
                    </Alert>
                )}
                {transactionsValidated && validationErrors.length === 0 && transactionCount === 0 && (
                    <Alert variant="light">
                        <span>No transactions found to validate. Upload a file with valid transactions and retry again.</span>
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};

export default ValidationReport;