import { validateCsvStructure } from '../helper_functions/validateMT940FileStructure';

describe('test validateCsvStructure function', () => {
    it('should return true for valid CSV structure with required headers', () => {
        const validCsvContent = `Reference,Account Number,Start Balance,End Balance,Mutation,Description
138932,NL90ABNA0585647886,94.9,109.53,+14.63,Flowers for Richard Bakker`;
        
        expect(validateCsvStructure(validCsvContent)).toBe(true);
    });

    it('should return false for CSV structure missing required headers', () => {
        const invalidCsvContent = `Reference,Account Number,Start Balance,End Balance
138932,NL90ABNA0585647886,94.9,109.53`;

        expect(validateCsvStructure(invalidCsvContent)).toBe(false);
    });

    it('should return false for empty CSV content', () => {
        const emptyCsvContent = '';

        expect(validateCsvStructure(emptyCsvContent)).toBe(false);
    });

    it('should return false for CSV with incorrect headers', () => {
        const incorrectHeadersCsv = `Ref,AccNum,StartB,EndB,Mut,Desc
138932,NL90ABNA0585647886,94.9,109.53,+14.63,Flowers for Richard Bakker`;

        expect(validateCsvStructure(incorrectHeadersCsv)).toBe(false);
    });
});
