const path = require('path');

module.exports = {
    testEnvironment: 'node',
    rootDir: '.',
    testMatch: ['<rootDir>/test/step-definitions/**/*.steps.ts'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.json',
            },
        ],
        // three 的 examples/jsm 是 ESM-only，用 babel 转译后才能被 jest 的 CJS 运行时加载
        '^.+\\.js$': ['babel-jest', { configFile: path.join(__dirname, 'babel.config.js') }],
    },
    // 只对 three 包放行 node_modules 忽略（其余仍忽略），让 FBXLoader 等 ESM 加载器可解析
    transformIgnorePatterns: ['/node_modules/(?!three/)'],
    verbose: true,
};
