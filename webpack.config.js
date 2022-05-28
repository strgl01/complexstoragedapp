// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },

   devServer: {
       contentBase: path.join(__dirname, 'public'),
       compress: true,
       port: 8080
   }     
   
};
