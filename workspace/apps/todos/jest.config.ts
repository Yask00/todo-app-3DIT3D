import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^.+\\.svg": "<rootDir>/tests/mocks/svgMock.tsx",
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/tests/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

export default config;
