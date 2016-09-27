var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var publicPath = "build/"; //编译到当前目录

module.exports = {
	entry:path.resolve(__dirname,'src/index.js'),
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
			{
				test:/\.jsx?$/,
				loader: 'babel',
				exclude:/(node_modules)/,
				query:{
					presets:['react','es2015']
				}
			},
			{test: /\.css$/, loader:ExtractTextPlugin.extract("style", "css") },
            {test: /\.html$/, loader: "html" },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'}
        ]
    },

    plugins:[
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

		new ExtractTextPlugin("css/[name].css"),	//单独使用style标签加载css并设置其路径
		new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
		/*
		new webpack.optimize.UglifyJsPlugin({	//压缩代码
		    compress: {
		        warnings: false
		    },
		    except: ['$super', '$', 'exports', 'require']	//排除关键字
		}),

		new webpack.ProvidePlugin({	//加载jq
            $: 'jquery'
        }),
		*/
	],

    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    }
};
