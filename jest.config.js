/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default () => {
  return {
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
