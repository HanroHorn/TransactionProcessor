import ValidationError from "./ValidationError";

interface ValidationReportSectionProps {
    sectionIndex: number,
    validationError: ValidationError;
}

export default ValidationReportSectionProps;