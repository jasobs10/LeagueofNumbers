const path = require('path');
module.exports = {
  context: __dirname,
  entry: "./frontend/index.js",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
    },
  devtool: 'source-maps',
  resolve: {
    extensions: ["*", ".js"]
  }
};
