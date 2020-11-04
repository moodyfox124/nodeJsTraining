module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  globals: {
    'ts-jest': {
      tsconfig: './mainProject/tsconfig.json'
    }
  },
  testPathIgnorePatterns: ["/node_modules/"],
  "coverageDirectory": "coverage",
  "collectCoverageFrom": [
    "./mainProject/**/*.{ts,js}",
  ]
};