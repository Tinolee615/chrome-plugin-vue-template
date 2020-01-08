const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const MangleJsClassPlugin = require('mangle-js-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');//打包css
const envStatus = process.env.NODE_ENV == 'production'?'prod':'dev';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

const isProd = process.env.NODE_ENV === 'production'?true:false

const config= {
  // devtool: 'inline-source-map',
  // mode:'production',
  entry: {
    'test': './src/plugins/test/index.js',
    'background': './src/plugins/background/background.js',
    'popup': './src/plugins/popup/index.js',
  },
  output: {
    filename: './js/[name].js'
  },
  resolve: {
    alias: {
      image: path.resolve(__dirname, 'src/common/images/')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback:'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,

      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'images/' // 图片打包后存放的目录
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        loader: 'url-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  // devServer:{
  //   contentBase: './dist',
  //   open: true,
  //   port: 8080,
  //   hot: true,
  //   hotOnly: true
  // },
  optimization: {
    minimize: envStatus=='prod'?false:false,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from:__dirname+'/src/static',
        to:''
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextWebpackPlugin({
      filename:  (getPath) => {
        console.log("getPath('css/[name].css')",getPath('css/[name].css'));
        return getPath('css/[name].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
    new ChromeExtensionReloader({
      entries: {
        contentScript: ['test'],
        manifest: __dirname + '/src/static/manifest.json',
        background:['background'],
        popup:['popup']
      }
    })
  ]
};

//删除打包文件
if(isProd){
  config.plugins.push(new CleanWebpackPlugin())
  config.plugins.push(new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
    cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
    cssProcessorOptions: {
      safe: true,
      discardComments: {
        removeAll: true
      }
    }, //传递给cssProcessor的选项，默认为{}
    canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
  }))
  config.plugins.push(new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        drop_debugger: false,
        drop_console: false
      }
    }
  }))
}

module.exports = config
