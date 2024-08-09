module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',  // Asegúrate de que todos los archivos JS/JSX se transformen con Babel
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(axios)/)" // Asegúrate de que 'axios' también se transforme
    ],
};
