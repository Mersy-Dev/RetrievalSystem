import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const __dirname: string = path.dirname(new URL(import.meta.url).pathname);
const translationsDir: string = path.resolve(__dirname, 'messages').replace('C:\\C:\\', 'C:\\');
const translationFileExtension: string = '.json';

const translationFiles: string[] = glob.sync(`${translationsDir}/*${translationFileExtension}`);
const enFilePath: string | undefined = translationFiles.find((file) => path.basename(file) === 'en.json');

if (!enFilePath) {
    console.error('Base translation file (en.json) is missing!');
    process.exit(1);
}

type LengthRange = { min: number; max: number };
type TranslationObject = {
    [key: string]: string | TranslationObject;
};


type LengthDiscrepancies = {
    minor: string[];
    medium: string[];
    major: string[];
};

const missingKeys = new Set<string>();
let allKeys = new Set<string>();

const estimateFairLengthRange = (englishText: string, key: string): LengthRange => {
    const englishLength = englishText.length;
    let minLength: number, maxLength: number;

    if (englishLength <= 10) {
        minLength = englishLength - 3;
        maxLength = englishLength + 3;
    } else if (englishLength > 10 && englishLength < 20) {
        minLength = englishLength - 5;
        maxLength = englishLength + 5;
    } else if (key.includes('button') || key.includes('title')) {
        minLength = englishLength - Math.floor(englishLength * 0.2);
        maxLength = englishLength + Math.floor(englishLength * 0.2);
    } else if (key.includes('description') || key.includes('footer')) {
        minLength = englishLength - Math.floor(englishLength * 0.3);
        maxLength = englishLength + Math.floor(englishLength * 0.3);
    } else {
        minLength = englishLength - Math.floor(englishLength * 0.1);
        maxLength = englishLength + Math.floor(englishLength * 0.1);
    }

    return { min: minLength, max: maxLength };
};

const collectKeys = (obj: TranslationObject, prefix: string = ''): Set<string> => {
    const extractedKeys = new Set<string>();
    Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            collectKeys(value as TranslationObject, fullKey).forEach((nestedKey) => extractedKeys.add(nestedKey));
        } else {
            extractedKeys.add(fullKey);
        }
    });
    return extractedKeys;
};

const enTranslations: TranslationObject = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'));
allKeys = collectKeys(enTranslations);

const logFilePath: string = path.resolve(__dirname, 'translation_check_log.txt').replace('C:\\C:\\', 'C:\\');
fs.writeFileSync(logFilePath, '', { flag: 'w' });

const logToFile = (message: string): void => {
    console.log(message);
    fs.appendFileSync(logFilePath, message + '\n');
};

translationFiles.forEach((filePath) => {
    if (path.basename(filePath) === 'en.json') return;
    const translations: TranslationObject = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    logToFile(`\nChecking file: ${filePath}`);

    let fileHasErrors = false;
    const currentTranslationKeys = collectKeys(translations);

    allKeys.forEach((key) => {
        if (!currentTranslationKeys.has(key)) {
            missingKeys.add(key);
            logToFile(`  Missing key: ${key}`);
            fileHasErrors = true;
        }
    });

    const lengthDiscrepancies: LengthDiscrepancies = {
        minor: [],
        medium: [],
        major: [],
    };

    const checkLength = (enText: string | TranslationObject, translationText: string | TranslationObject, key: string): void => {
        if (typeof enText === 'string' && typeof translationText === 'string') {
            const { min, max } = estimateFairLengthRange(enText, key);
            const translationLength = translationText.length;
            if (translationLength < min || translationLength > max) {
                const percentageDiff = Math.abs((translationLength - enText.length) / enText.length) * 100;
                if (percentageDiff <= 10) {
                    lengthDiscrepancies.minor.push(`Original length is ${enText.length}, found ${translationLength} for key: ${key}`);
                } else if (percentageDiff <= 20) {
                    lengthDiscrepancies.medium.push(`Original length is ${enText.length}, found ${translationLength} for key: ${key}`);
                } else {
                    lengthDiscrepancies.major.push(`Original length is ${enText.length}, found ${translationLength} for key: ${key}`);
                }
                fileHasErrors = true;
            }
        } else if (typeof enText === 'object' && typeof translationText === 'object') {
            Object.keys(enText).forEach((nestedKey) => {
                checkLength(enText[nestedKey], (translationText as TranslationObject)[nestedKey], `${key}.${nestedKey}`);
            });
        }
    };

    Object.keys(enTranslations).forEach((key) => {
        checkLength(enTranslations[key], translations[key], key);
    });

    if (Object.values(lengthDiscrepancies).some((arr) => arr.length > 0)) {
        logToFile('  📏 Length discrepancies:');
        if (lengthDiscrepancies.major.length > 0) {
            logToFile('    Major (>20% discrepancy):');
            lengthDiscrepancies.major.forEach((discrepancy) => logToFile(`      - ${discrepancy}`));
        }
        if (lengthDiscrepancies.medium.length > 0) {
            logToFile('    Medium (10%-20% discrepancy):');
            lengthDiscrepancies.medium.forEach((discrepancy) => logToFile(`      - ${discrepancy}`));
        }
        if (lengthDiscrepancies.minor.length > 0) {
            logToFile('    Minor (<10% discrepancy):');
            lengthDiscrepancies.minor.forEach((discrepancy) => logToFile(`      - ${discrepancy}`));
        }
    }

    if (!fileHasErrors) {
        logToFile(`  No issues found in ${path.basename(filePath)}.\n`);
    }
});

if (missingKeys.size > 0) {
    logToFile('\nMissing translations for the following keys:');
    missingKeys.forEach((key) => logToFile(`- ${key}`));
    logToFile('\nExiting due to missing translations!');
    process.exit(1);
} else {
    logToFile('\nAll translations are complete!');
}
