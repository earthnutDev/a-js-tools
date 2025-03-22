/** @type {import('ts-jest').JestConfigWithTsJest} */
export default () => {
  return {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          isolatedModules: true,
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
      '!index.ts',
    ],
    coverageReporters: ['text', 'lcov', 'html', 'text-summary'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 85,
        lines: 85,
        statements: 90,
      },
    },
  };
};
