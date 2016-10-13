var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var publicPath = "build/"; //编译到当前目录
//优化http://blog.csdn.net/code_for_free/article/details/52556896
module.exports = {
	entry: [
      'webpack/hot/only-dev-server',  //热加载
      "./src/index.js"
    ],
	//第三方库
	vendor:["react","react-dom","react-router"],
	output: {
        //'path': path.join(__dirname, 'build'), //编译到当前目录
        //'publicPath': 'build', // 网站运行时的访问路径
        //'filename': 'js/index.js'  //编译后的文件名字
		path: path.join(__dirname, 'build'),
        filename: 'js/[name].js', //编译后的文件名字
        publicPath: publicPath, // 网站运行时的访问路径
    },
    module: {
        loaders: [
			//{test:/\.jsx?$/,loader: 'babel',exclude:/(node_modules)/,query:{presets:['es2015','stage-0','react']}},
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{test: /\.css$/, loader:ExtractTextPlugin.extract("style", "css") },
			//{test: /\.less?$/,loaders : ['style-loader','css-loader','less-loader?{"sourceMap":true}'], include: __dirname},
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
			template:'./src/template/index.html',	//html模板路径
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
		new webpack.optimize.UglifyJsPlugin({
		    output: {
		        comments: false, //删除所有注释
		    },
			compress:{
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
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
