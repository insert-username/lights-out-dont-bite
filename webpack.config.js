module.exports = {
  entry: './src/run.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /pixi.js/, loader: 'script' },
      { test: /phaser.js/, loader: 'script' },
      { test: /.json$/, loader: 'file' },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      }
    ]
  }
};
