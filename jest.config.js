/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default () => {
  return {
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/index.{ts,tsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
      '!**/dist/**',
    ],
    coverageReporters: ['text', 'lcov', 'html', 'text-summary'],
    coverageDirectory: 'coverage',
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
  };
};
