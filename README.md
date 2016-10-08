# holichat 微信版本

## 说明 
	2016-09-23
	react redux  route antd  es6 

## 使用  
一. 编译\打包文件
	> webpack
	> npm run start
二. 运行
新开控制台窗口,运行下面命令
```bash
npm start
```    
三. 访问
浏览器输入 localhost:3000 访问

## 目录 

├── package.json 
├── README.md  说明文件
├── webpack.config.js // webpack 配置文件 
├── test // test 目录：测试文件 
├── dist // dist 目录：放置开发时候的临时打包文件 
├── mocks // 数据 mock 相关 
├── src // 项目开发的源代码 
│ ├── html // html 目录 







│ │ ├── index.html 
│ │ └── page2.html 
│ ├── js // js 目录 
│ │ ├── common // 所有页面的共享区域，可能包含共享组件，共享工具类 
│ │ ├── home // home 页面 js 目录 
│ │ │ ├── components 
│ │ │ │ ├── App.js 
│ │ │ ├── index.js // 每个页面会有一个入口，统一为 index.js 
│ │ ├── page2 // page2 页面 js 目录 
│ │ │ ├── components 
│ │ │ │ ├── App.js 
│ │ │ └── index.js 
│ └── style // style 目录 
│ ├── common // 公共样式区域 
│ │ ├── varables.less // 公共共享变量 
│ │ ├── index.less // 公共样式入口
│ ├── home // home 页面样式目录 
│ │ ├── components // home 页面组件样式目录 
│ │ │ ├── App.less 
│ │ ├── index.less // home 页面样式入口 
│ ├── page2 // page2 页面样式目录 
│ │ ├── components 
│ │ │ ├── App.less 
│ │ └── index.less 
├── vendor 
│ └── bootstrap 
└── └── jquery


三. 插件说明
	reqwest       用于浏览器异步HTTP请求。支持xmlHttpRequest, JSONP, CORS, 和 CommonJS约束。
	classnames    https://www.npmjs.com/package/classnames
	normalize.css Normalize.css是保留浏览器的原来样式并且做到每个浏览显示一致。 
	iscroll  https://www.npmjs.com/package/react-iscroll
	fetch-jsonp  相当于ajax
	isparta PNG压缩与格式转换工具
