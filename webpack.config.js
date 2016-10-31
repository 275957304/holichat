var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var publicPath = "build/"; //编译到当前目录

module.exports = {
	entry: [
      'webpack/hot/only-dev-server',
      "./src/index.js"
    ],
	output: {
        //'path': path.join(__dirname, 'build'), //编译到当前目录
        //'publicPath': 'build', // 网站运行时的访问路径
        //'filename': 'js/index.js'  //编译后的文件名字
		path: path.join(__dirname, 'build'),
        filename: 'js/[name].js', //编译后的文件名字
        publicPath: publicPath, // 网站运行时的访问路径
		// 添加 chunkFilename表示未被列在entry中，却又需要被打包出来的文件命名配置     做按需加载   在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的
		chunkFilename: '[name].[chunkhash:5].chunk.js' //name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。 chunkhash 是文件的 hash 码，这里只使用前五位。
    },
    module: {
        loaders: [
			//{test:/\.jsx?$/,loader: 'babel',exclude:/(node_modules)/,query:{presets:['es2015','stage-0','react']}},
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{test: /\.css$/, loader:ExtractTextPlugin.extract("style", "css") },
			{test: /\.less?$/,loaders : ['style-loader','css-loader','less-loader?{"sourceMap":true}'], include: __dirname},
            {test: /\.html$/, loader: "html" },
			{test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'}
        ]
    },
	resolve: {
		alias: {
			'react': path.join(__dirname, 'node_modules', 'react')
		},
		extensions: ['', '.js', '.jsx']
	},
    plugins:[
		/*
		new webpack.ProvidePlugin({	//加载zepto
            $: 'zepto'
        }),
		*/
		new HtmlwebpackPlugin({
			//favicon:'./src/img/favicon.ico', //favicon路径
			filename: './index.html', //渲染输出html文件名,路径相对于 output.path 的值
			template: path.resolve(__dirname, './src/template/index.html'),
			title: '活力圈',
			filename: '../index.html',
			inject:true,//允许插件修改哪些内容，包括head与body
			hash:true,	//为静态资源生成hash值
			minify:{	//压缩HTML文件
				removeComments:true,	//移除HTML中的注释
				collapseWhitespace:true	//删除空白符与换行符
			}
		}),
		new webpack.HotModuleReplacementPlugin(), //热加载
		new ExtractTextPlugin("css/[name].css"),	//单独使用style标签加载css并设置其路径
		new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
		new webpack.NoErrorsPlugin(),
		/*
		new webpack.optimize.UglifyJsPlugin({	//压缩代码
		    compress: {
		        warnings: false
		    },
		    except: ['$super', '$', 'exports', 'require']	//排除关键字
		}),


		*/
	]


};
