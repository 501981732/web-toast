module.exports = {
  entry: './src/components/web-toast.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index.min.js',
    library: 'webToast',
    sourceMapFilename: 'index.min.map',
    libraryTarget: 'umd'
  },
  devtool: 'source-map'
};