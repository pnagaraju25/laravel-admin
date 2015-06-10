/**
 * Gulp tasks
 */
'use strict';

var elixir = require('laravel-elixir');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var express = require('express');
var morgan = require('morgan');
var autoprefixer = require('autoprefixer-core');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');

gulp.task('server', function () {
    var server = express();

    server.use(morgan('dev'));
    server.use(express.static(__dirname + '/public/html'));

    server.listen(9001);
});

gulp.task('browserSync', function () {
    browserSync({
        proxy : 'localhost:9001',
        notify: false
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('style', function () {
    return gulp.src(__dirname + '/public/html/scss/**/*.scss')
        .pipe(sass({
            sourceComments: 'map',
            sourceMap     : 'sass',
            outputStyle   : 'nested'
        }))
        .on('error', function (error) {
            console.log(error);
            process.exit(1);
        })
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    '> 1%',
                    'last 2 version',
                    'Firefox >= 20',
                    'Opera 12.1'
                ]
            })
        ]))
        .pipe(gulp.dest(__dirname + '/public/html/css'))
        .pipe(browserSync.stream());
       // .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});

gulp.task('watch', ['browserSync', 'style', 'server'], function () {
    gulp.watch(__dirname + '/public/html/scss/**/*.scss', ['style']);
    gulp.watch(__dirname + '/public/html/**/*.html', ['reload']);
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

gulp.task('elixir', function () {
    elixir(function (mix) {
        mix.less('app.less');
    });
});


gulp.task('default', ['watch']);