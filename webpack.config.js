var webpack = require('webpack');
var path = require("path")

module.exports = {
    mode: 'production',
    entry: './frontend/pages/main/react-src/index.jsx',
    output: {
        path: path.join(__dirname, 'frontend/public/bundles'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                
                enforce: "pre",
                enforce: "post",
                
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/react"]
                }
              },
              {
                test: /\.s?[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                ],
              }
        ]
    }
}