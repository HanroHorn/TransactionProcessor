// Core Imports
import React from "react";

// Style Imports
import { FaCircleExclamation } from "react-icons/fa6";
import { Alert } from "react-bootstrap";

// Utitily Imports
import ValidationReportSectionProps from "../interfaces/ValidationReportSectionProps";

const ValidationReporSection: React.FC<ValidationReportSectionProps> = ({ sectionIndex, validationError }) => {
    return (
        <Alert key={`alert_section_${sectionIndex}`} variant="light">
            <strong>Transaction ID: {validationError.transactionReference}</strong>
            <ul style={{ listStyleType: "none" }}>
                {validationError.validationErrors.map((item, index) => (
                    <li key={`report_section_${index}`}>
                        <FaCircleExclamation fontSize={12} color="#fd6540" /> {item}
                    </li>
                ))}
            </ul>
        </Alert>
    );
};

export default ValidationReporSection;