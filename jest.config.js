const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^next/router$': '<rootDir>/__mocks__/next/router.js',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

module.exports = createJestConfig(customJestConfig);
