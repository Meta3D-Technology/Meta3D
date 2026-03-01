module.exports = {
    presets: [
        [
            "@babel/preset-react",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
    ]
};