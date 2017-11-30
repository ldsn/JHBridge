module.exports = function(env = {}){
  const webpack     = require('webpack'),
        path        = require('path'),
        fs          = require('fs'),
        packageConf = JSON.parse(fs.readFileSync('package.json', 'utf-8')),
        target = process.env.npm_lifecycle_event

  let name      = packageConf.name,
      version   = packageConf.version,
      library   = name.replace(/^(\w)/, m => m.toUpperCase()),
      proxyPort = 8081,
      plugins   = [],
      rules   = [];

  if(target == 'build'){
    name += `-${version}.min.js`;
    //compress js in production environment
    // plugins.push(
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //       warnings: false,
    //       drop_console: false,
    //      }
    //   })
    // );
  }



  let babelConf
  if(fs.existsSync('./.babelrc')){
    //use babel
    babelConf = JSON.parse(fs.readFileSync('.babelrc'));
    rules.push({
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: babelConf
    });
  }



  return {
    entry: [ './index.js'],
    output: {
      filename: env.production ? name : 'index.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/static/',
      library: 'JHBridge',
      libraryTarget: 'umd'
    },

    plugins: plugins,

    module: {
      rules: rules
    },

    devServer: {
      proxy: {
        "*": `http://127.0.0.1:${proxyPort}`,
      }
    }
  };
}
