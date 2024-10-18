import { validateXmlStructure } from '../helper_functions/validateMT940FileStructure';

describe('test validateXmlStructure function', () => {
    it('should return true for valid XML structure with required tags', () => {
        const validXmlContent = `<records>
            <record reference="138932">
                <accountNumber>NL90ABNA0585647886</accountNumber>
                <description>Flowers for Richard Bakker</description>
                <startBalance>94.9</startBalance>
                <mutation>+14.63</mutation>
                <endBalance>109.53</endBalance>
            </record>
        </records>`;

        expect(validateXmlStructure(validXmlContent)).toBe(true);
    });

    it('should return false for XML structure missing required tags', () => {
        const invalidXmlContent = `<records>
            <record reference="138932">
                <accountNumber>NL90ABNA0585647886</accountNumber>
                <description>Flowers for Richard Bakker</description>
                <mutation>+14.63</mutation>
                <endBalance>109.53</endBalance>
            </record>
        </records>`;

        expect(validateXmlStructure(invalidXmlContent)).toBe(false);
    });

    it('should return false for XML structure missing the expected header', () => {
        const missingHeaderXmlContent = `<record reference="138932">
            <accountNumber>NL90ABNA0585647886</accountNumber>
            <description>Flowers for Richard Bakker</description>
            <startBalance>94.9</startBalance>
            <mutation>+14.63</mutation>
            <endBalance>109.53</endBalance>
        </record>`;

        expect(validateXmlStructure(missingHeaderXmlContent)).toBe(false);
    });

    it('should return false for XML content that does not contain required tags', () => {
        const incorrectTagsXml = `<records>
            <record reference="138932">
                <name>Richard Bakker</name>
                <balance>109.53</balance>
            </record>
        </records>`;

        expect(validateXmlStructure(incorrectTagsXml)).toBe(false);
    });

    it('should return false for empty XML content', () => {
        const emptyXmlContent = '';

        expect(validateXmlStructure(emptyXmlContent)).toBe(false);
    });
});
