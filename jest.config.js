export default {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest", // Use Babel for JavaScript files
    },
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Add this line for global setup and teardown
};