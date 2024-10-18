// Core Imports
import React, { useState, lazy, Suspense, useCallback, useMemo } from 'react';

// Style Imports
import { Col, Container, Navbar, Row } from 'react-bootstrap';

// Utility Imports
import FileUpload from './FileUpload';
import GenericComponentLoader from './GenericComponentLoader';
import ValidationError from '../interfaces/ValidationError';
import FileInfo from '../interfaces/FileInfo';
import Transaction from '../interfaces/Transaction';
import validateTransactionsPerFile from '../helper_functions/validateTransactionsPerFile';

// Lazy load these components since they won't be accessed immediately
const ValidationReport = lazy(() => import('./ValidationReport'));
const FileUploadHistory = lazy(() => import('./FileUploadHistory'));

const TransactionValidator: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [busyValidating, setBusyValidating] = useState(false);
  const [transactionsValidated, setTransactionsValidated] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);

  const onAllFilesParsed = useCallback((uploadedFiles: FileInfo[], transactionList: Transaction[]): void => {
    setTransactionsValidated(false);
    setUploadedFiles(uploadedFiles);
    setTransactionList(transactionList);
    setTransactionCount(transactionList.length);
    setValidationErrors([]);
  }, []);

  const validationResults = useMemo(() => validateTransactionsPerFile(transactionList), [transactionList]);

  const validateTransactions = useCallback((): void => {
    setBusyValidating(true);
    setValidationErrors(validationResults);
    setTransactionsValidated(true);
    setBusyValidating(false);
    
  }, [validationResults]);

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary mb-4">
        <Container>
          <Navbar.Brand>
            Customer Transaction Processor
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Implemented by Hanro Horn
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className='mb-4'>
          <Col lg={4}>
            <FileUpload onAllFilesParsed={onAllFilesParsed} />
          </Col>
          <Col lg={8}>
            <Suspense fallback={<GenericComponentLoader />}>
              <FileUploadHistory
                uploadedFiles={uploadedFiles}
                validateTransactions={validateTransactions}
                transactionsValidated={transactionsValidated}
                busyValidating={busyValidating}
                transactionCount={transactionCount}
              />
            </Suspense>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Suspense fallback={<GenericComponentLoader />}>
            <ValidationReport validationErrors={validationErrors} transactionsValidated={transactionsValidated} transactionCount={transactionCount}></ValidationReport>
            </Suspense>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TransactionValidator;
