/** @type {import('ts-jest').JestConfigWithTsJest} */
export default () => {
  return {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.json',
        },
      ],
    },
    fakeTimers: {
      enableGlobally: true,
    },
    testMatch: ['**/*.test.(js|ts|tsx|jsx)'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/index.{ts,tsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
      '!**/dist/**',
      '!**/types.ts',
      '!**/type.ts',
      '!index.ts',
    ],
    coverageReporters: ['text', 'lcov', 'html', 'text-summary'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 10,
        functions: 10,
        lines: 10,
        statements: 10,
      },
    },
  };
};
