/**
 * Created by libo on 2017/12/21.
 */
var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var clean = require('gulp-clean');
var rev = require('gulp-rev'),//文件名md5
    minifyCss = require('gulp-clean-css'),//css压缩
    revCollector=require('gulp-rev-collector'),//路径替换
    runSequence = require('run-sequence');//同步执行任务

var org = 'src';
var option = {base: 'src'};
var tap = require('gulp-tap');
var path = require('path');
var fs = require('fs');
var browserSync = require('browser-sync');

// // <!-- @@include('../include/meta.html') -->
// gulp.task('fileinclude', function () {
//     gulp.src('src/pages/**/*.html')
//         .pipe(fileinclude({
//             prefix: '@@',
//             basepath: '@file'
//         }))
//         .pipe(gulp.dest('dist'));
// });

// 清理文件
gulp.task('clean', function() {
    gulp.src(['dist'], {read: false})
        .pipe(clean());
});

// include
gulp.task('include', function (){
    gulp.src(org + '/pages/index.html')
        .pipe(tap(function (file){
            // var dir = path.dirname(file.path)+'/include/';
            var dir = 'src/include/';
            var contents = file.contents.toString();

            contents = contents.replace(/<#include\s'(.*)'>/gi, function (match, $1){
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                var content = fs.readFileSync(filename, 'utf-8');
                return content;
            });
            file.contents = Buffer.from(contents);
        }))
        .pipe(gulp.dest('dist'));
        // .pipe(browserSync.reload({stream: true}));
});

gulp.task('buildCss', function (){
    gulp.src(org + '/assets/css/*.css')
        .pipe(minifyCss())
        .pipe(rev()) // md5文件
        .pipe(gulp.dest('dist/assets/css/')) 
        .pipe(rev.manifest()) // set hash key json
        .pipe(gulp.dest('rev/css')) //指定文件夹
        // .pipe(browserSync.reload({stream: true}));
});

// 用md5码替换应用地址
gulp.task('rev', function() {
    gulp.src(['rev/**/*.json', 'dist/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
});

// gulp 执行
// gulp.task('default',['clean', 'include', 'buildCss', 'rev']);
gulp.task('default', function(cb) {
    runSequence('clean', ['include', 'buildCss'], cb);
});

// gulp
// gulp rev