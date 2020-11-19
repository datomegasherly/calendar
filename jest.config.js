module.exports = {
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/style.mock.js"
    },
    setupFiles: ['<rootDir>/enzyme.config.js']
}