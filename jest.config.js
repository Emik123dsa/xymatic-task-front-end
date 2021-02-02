module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/app/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.jsx'],
};
