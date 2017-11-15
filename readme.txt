src-*为html的原始文件
dist-*或nt-*为编译后的文件，也就是应该上传到服务器的文件
dist-*主要是项目
nt-*主要是产品

编译步骤
1 安装nodes
参考
https://nodejs.org/en/ 或者 http://nodejs.cn/download/
2 安装gulp
参考
http://www.gulpjs.com.cn/docs/getting-started/
3 安装依赖包
有 package.json
运行npm install 安装node_modules
4 运行
gulp -t xxx -w -s
xxx为项目名称，具体可以在gulp.js中维护
默认对应src-xxx目录
-s 启动server
-w 启动监视，源文件有变动则刷新浏览器


【简介】
stockforce
fansforce 			微信个人中心
dataforce 			dataforce可视化
app-download 		shopforce下载页面
report 				查询报表
dashboard 			数据罗盘
dashboard-phone 	数据罗盘手机版
products 			商品浏览

【crm类项目的图片说明】
bg.png 750x380 头图
gift_item.png 200x250 - 可领优惠券
grey.png 199x250 - 不可用优惠券
green_item.png 200x250 - 可用优惠券
inf_item.png 200x250 - 免费领取优惠券
item-info.png 490x250 - 优惠券左边部分背景
logo.png - -
no_integral.png 322x322 - 暂无内容
product-default.jpg 240x240 - 默认商品
