const path = require("path");

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.*css$/,
          use: [
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
      ]
    },
    // reslove: {
    //   alias: {
    //     "react-router-dom": path.resolve(__dirname, 'node_modules/react-router-dom/')  // trying to solve route must be within router
    //   }
    // }
  },
  title: "MVP",
  require: [
    // 'babel-polyfill',
    // path.join(__dirname, 'path/to/script.js'),1
    path.join(__dirname, 'src/styleguide/styles.css')
  ],
  styleguideDir: "dist-docs",
  moduleAliases: {
    "react-sample-components-library": path.resolve(__dirname, "src"),
    // "react-router-dom": path.resolve(__dirname, 'node_modules/react-router-dom/')  // trying to solve route must be within router
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
  }
};
