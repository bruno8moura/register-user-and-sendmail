/*
* For a detailed explanation regarding each configuration property, visit:
* https://jestjs.io/docs/en/configuration.html
*/

module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
