const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
    // call dotenv and it will return an Object with a parsed key 
    const env = dotenv.config().parsed;
    
    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  
    return {
        devServer: {
            port: 9000
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/i,
                    use: [
                      {
                        loader: 'url-loader'
                      }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },         
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new webpack.DefinePlugin(envKeys)
      ]
    };
}
