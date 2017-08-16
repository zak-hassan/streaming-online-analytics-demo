var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './javascript/index.jsx'
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
      path: __dirname + '/public/build'
    },


    plugins: [
      //copy patternfly assets
      new CopyWebpackPlugin([
          {
              from: { glob: './node_modules/patternfly/dist/img/*.*'},
              to: './img',
              flatten: true
          },
          {
              from: { glob: './node_modules/patternfly/dist/fonts/*.*'},
              to: './fonts',
              flatten: true
          },
          {
              from: { glob: './node_modules/patternfly/dist/css/*.*'},
              to: './css',
              flatten: true
          },
          {
              from: { glob: './node_modules/react-bootstrap-table/css/*.*'},
              to: './css',
              flatten: true
          }
      ]),
    ]
};
