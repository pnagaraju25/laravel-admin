/**
 * Gulp tasks
 */
'use strict';

var elixir = require('laravel-elixir');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var express = require('express');
var morgan = require('morgan');

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

gulp.task('watch', ['browserSync', 'server'], function () {
    gulp.watch(__dirname + '/public/html/*', ['reload']);
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