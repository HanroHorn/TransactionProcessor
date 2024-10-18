import { validateIBAN } from "../helper_functions/validationHelpers";

describe('test validateIBAN function', () => {
    it('should return true for valid IBANs', () => {
        const validIBANList = [
            'NL56RABO0149876948',
            'NL93ABNA0585619023',
            'NL74ABNA0248990274',
            'NL91RABO0315273637'
        ];

        validIBANList.forEach((iban) => {
            expect(validateIBAN(iban)).toBe(true);
        });
    });

    it('should return false for invalid IBANs', () => {
        const validIBANList = [
            'NLRABO0149876948',
            'NL93AB0585619023',
            'NL74ABNA0248990',
            'ZA1RABO0315273637'
        ];

        validIBANList.forEach((iban) => {
            expect(validateIBAN(iban)).toBe(false);
        });
    });
});