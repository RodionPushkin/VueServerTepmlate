const {defineConfig} = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,
    outputDir: path.resolve(__dirname, "./server/dist"),
    devServer: {
        proxy: 'http://127.0.0.1:80/'
    },
    lintOnSave: process.env.NODE_ENV !== 'production'
})
