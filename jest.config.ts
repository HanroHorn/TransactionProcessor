export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom', 
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
        '^helper_functions/(.*)$': '<rootDir>/src/helper_functions/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
    },
}