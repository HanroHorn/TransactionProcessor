import { validateTrancactionEndBalance } from "../helper_functions/validationHelpers";

describe('test validateTrancactionEndBalance function', () => {
    it('should return true for valid end balance values', () => {
        expect(validateTrancactionEndBalance(100, 50, 150)).toBe(true);
        expect(validateTrancactionEndBalance(25, 100, 45)).toBe(false);
        expect(validateTrancactionEndBalance(100, -45, -10)).toBe(false);
    });
});