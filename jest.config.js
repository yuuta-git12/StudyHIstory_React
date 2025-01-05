module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
    },
    "setupFiles": ["<rootDir>/src/setupTests.js"]
  };
  