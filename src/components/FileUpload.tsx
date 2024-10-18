// Core Imports
import React, { useRef, useState } from 'react';

// Utility imports
import FileUploadProps from '../interfaces/FileUploadProps';

// Style Imports
import { Alert, Button, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaCircleInfo } from "react-icons/fa6";
import { parseContentFromFile } from '../helper_functions/parseContentFromFile';

const FileUpload: React.FC<FileUploadProps> = ({ onAllFilesParsed }) => {
    const [fileList, setFileList] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false); // TODO: Do something with loader
    const [showAlerts, setShowAlerts] = useState(false);
    const [failedFileCount, setFailedFileCount] = useState(0);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const updateFileList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFilesFromInput = e.target.files;
        if (uploadedFilesFromInput && uploadedFilesFromInput.length > 0) {
            setFileList(uploadedFilesFromInput);
        }
    }

    const uploadFiles = () => {
        if (!fileList || fileList?.length === 0) {
            return;
        }
        
        setLoading(true);
        setShowAlerts(false);

        parseContentFromFile(fileList)
        .then(({ uploadedFiles, transactionList, failedUploadCount }) => {
            // Clear the file upload input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            setFailedFileCount(failedUploadCount);
            setLoading(false);
            setFileList(null);
            setShowAlerts(true);
            onAllFilesParsed(uploadedFiles, transactionList);
        })
        .catch((error) => {
            console.error("Error parsing files:", error);
        });
    }

    return (
        <Card>
            <Card.Header>Upload Transaction Files</Card.Header>
            <Card.Body className='card-height-wrapper'>
                <Form>
                    <InputGroup className="mb-3">
                        <Form.Control
                            ref={fileInputRef}
                            type='file'
                            accept='.xml, .csv'
                            onChange={updateFileList}
                            multiple>
                        </Form.Control>
                        <Button variant="primary" onClick={uploadFiles} disabled={fileList && fileList?.length > 0 ? false : true}>
                            {loading ? (<Spinner animation="border" role="status" aria-hidden="true" size='sm'></Spinner>) : (<span>Upload</span>)}
                        </Button>
                    </InputGroup>

                </Form>
                <Card.Text className='text-secondary fs-6 lead'>
                    <FaCircleInfo color='lightGray' /> Supported Formats: .csv .xml
                </Card.Text>
                {showAlerts && failedFileCount === 0 && (
                    <Alert variant='success' dismissible>Files sucessfully uploaded. To validate, click on "Validate Transactions" in the uploaded files section.</Alert>
                )}
                {showAlerts && failedFileCount > 0 && (
                    <Alert variant='warning' dismissible>Soms files were found invalid. Only the valid files will be uploaded. To validate, click on "Validate Transactions" in the uploaded files section.</Alert>
                )}
            </Card.Body>
        </Card>
    );
}

export default FileUpload;
