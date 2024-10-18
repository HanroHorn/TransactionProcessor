import { validateDataIntegrityNumericalFields } from "../helper_functions/validationHelpers";

describe('test validateDataIntegrityNumericalFields function', () => {
    it('should return true for valid numerical values', () => {
        const positiveNumber = 100;
        const negativeNumber = -200;
        const stringValue = 'test';
        const undefinedValue = undefined;

        expect(validateDataIntegrityNumericalFields(positiveNumber)).toBe(true);
        expect(validateDataIntegrityNumericalFields(negativeNumber)).toBe(true);
        expect(validateDataIntegrityNumericalFields(stringValue)).toBe(false);
        expect(validateDataIntegrityNumericalFields(undefinedValue)).toBe(false);
    });
});