module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  modulePathIgnorePatterns: ['/node_modules/', 'dist'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    // '**/__test__/**/*.[jt]s?(x)',
    // "**/?(*.)+(spec|test).[jt]s?(x)"
    // '**/pager/__test__/?(*.)+(spec|test).[jt]s?(x)',
    '**/checkbox/__test__/?(*.)+(spec|test).[jt]s?(x)',
  ],
  roots: ['<rootDir>'],
}
