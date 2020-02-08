npm init
npm i babel-cli browserify -g

<!-- es6->es5: js/src下的所有文件es6内容转换为es5放到js/build下 -->
babel js/src -d js/build
<!-- 打包：require装换 -->
browserify js/build/main.js -o js/dist/main.js

<!-- 版本1里最新的 -->
npm i jquery@1

cli: 命令行
.babelrc: rc-->run control 运行时控制的文件