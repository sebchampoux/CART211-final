const { gulp, watch } = require('gulp');
const browsersync = require('browser-sync').create();

function reloadServer() {
    return new Promise(resolve => {
        browsersync.reload();
        resolve();
    });
}

function devServer() {
    browsersync.init({
        server: './',
        notify: false
    });

    watch('./**/*.html', reloadServer);
    watch('./css/**/*.css', reloadServer);
    watch('./js/**/*.js', reloadServer);
}

exports.default = devServer;