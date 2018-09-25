module.exports = {
  preset: "jest-preset-angular",
  roots: ['src'],
  setupTestFrameworkScriptFile: "<rootDir>/src/setup-jest.ts",
  moduleNameMapper: {
    "@lib/(.*)": "<rootDir>/src/lib/$1"
  }
}