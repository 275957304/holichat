/*
npm run build
express: node的服务器框架
webpack-dev-middleware：webpack实时监控编译的中间件
webpack-hot-middleware：hot替换中间件
babel-plugin-react-transformbabel插件
react-transform-hmr：react支持热替换
https://github.com/babel/example-node-server  babel,node,server更详细的配置

.babelrcnode启动时采用babel的编译配置
scr/server.js服务器文件
config/appConfig.js应用配置文件

react-transform可以直接写在.babelrc文件中的，但是我们以后会加入其他插件（加入后会与其他插件冲突）,所以这里写在webpack.dev.js中，新的配置如下：
*/
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const pxtorem = require('postcss-pxtorem')
module.exports = {
	entry: [
      'webpack/hot/only-dev-server',
      "./src/index.js",
	  //vendor: ["react","react-dom","react-router","@fdaciuk/ajax"]
    ],
	output: {
		path: path.join(__dirname, 'build'),
        filename: 'js/[name].js', //编译后的文件名字
        publicPath: '/react/build/', // 网站运行时的访问路径
		chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
    },
    module: {
        loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{test: /\.css$/, loader:ExtractTextPlugin.extract('style', 'css!postcss') },  //如果没用插件就 loader: "style-loader!css-loader!postcss-loader"
			{test: /\.less/, loader: "style-loader!css-loader!postcss-loader!less-loader"},
            {test: /\.html$/, loader: "html" },
			{test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'}
        ]
    },
	resolve: {
		modulesDirectories: ['src', 'node_modules'],
		alias: {
			//'react': path.resolve(__dirname, 'node_modules', 'react'),
			//'jWeixin': path.resolve(__dirname, './src/utils/weixin/jweixin-1.0.0.js'),
		},
		extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
	},

	postcss: [
		pxtorem({
			rootValue: 100,
			propWhiteList: [],
			selectorBlackList: [/^\.ant-/],
		}),
	],

    plugins:[
		// new webpack.ProvidePlugin({
        //     wx : 'utils/weixin/jweixin-1.0.0.js'
        // }),
		new HtmlwebpackPlugin({
			//favicon:'./src/img/favicon.ico', //favicon路径
			filename: '../index.html', //渲染输出html文件名,路径相对于 output.path 的值
			template: path.resolve(__dirname, './src/template/index.html'),
			title: '活力圈',
			inject:true,//允许插件修改哪些内容，包括head与body
			hash:true,	//为静态资源生成hash值
			showErrors:false, //是否显示错误
			cache:false, //是否缓存
			minify:{	//压缩HTML文件
				removeComments:true,	//移除HTML中的注释
				collapseWhitespace:true	//删除空白符与换行符
			}
		}),
		new webpack.HotModuleReplacementPlugin(), //热加载
		new ExtractTextPlugin("css/[name].css"),	//单独使用style标签加载css并设置其路径     分离css 先安装webpack插件：install extract-text-webpack-plugin --save
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors', // 这公共代码的chunk名为'commons'
			filename: 'js/[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
			minChunks: 4, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
		}),
		new webpack.NoErrorsPlugin(),
		/*
		new webpack.optimize.UglifyJsPlugin({	//压缩代码
		    compress: {
		        warnings: false
		    },
		    except: ['$super', '$', 'exports', 'require']	//排除关键字
		}),
		new webpack.DefinePlugin({  //将React切换到产品环境
		  "process.env": {
			 NODE_ENV: JSON.stringify("production")
			 // NODE_ENV: JSON.stringify(process.env.NODE_ENV),  这时候注意打包的时候要带上node的环境设置，例如： NODE_ENV=production webpack --config webpack.production.config.js --progress1
		   }
		})
		*/
	]
};
