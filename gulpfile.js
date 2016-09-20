var gulp = require('gulp');
var sass = require('gulp-sass');

var path = require('path');
var bourbon = require('node-bourbon');
var sassTypes = require('node-sass').types;

var config = {};
config.paths = {
    sass: 'sass',
    css: 'app/styles',
    images: 'app/media/images',
    fonts: 'app/media/fonts'
};
config.files = {
    sass: `${config.paths.sass}/**/*.sass`,
    css: `${config.paths.css}/**/*.css`
};

var assetUrl = function (type, $assetPath) {
    var assetsPathForType = {
        image: config.paths.images,
        font: config.paths.fonts
    };
    if (!assetsPathForType[type]) {
        throw new Error(`assetUrl: type ${type} not supported, must be one of ${Object.keys(assetsPathForType)}`);
    }
    var assetPath = $assetPath.getValue();
    var sassFilepath = this.options.file;
    // Since sassFilepath is a file, we need to normalise for
    // directory relations.
    var relativeToStylesRoot = path.relative(path.dirname(sassFilepath), config.paths.sass);
    var stylesRootToAssets = path.relative(config.paths.css, assetsPathForType[type]);
    var stylesToAssetpath = path.join(relativeToStylesRoot, stylesRootToAssets, assetPath);
    var urlString = `url('${stylesToAssetpath}')`;
    return new sassTypes.String(urlString);
};

gulp.task('sass', () => {
    return gulp.src(config.files.sass)
        .pipe(sass({
            includePaths: bourbon.includePaths,
            functions: {
                'image-url($filepath)': function ($filepath) {
                    return assetUrl.call(this, 'image', $filepath);
                },
                'font-url($filepath)': function ($filepath) {
                    return assetUrl.call(this, 'font', $filepath);
                }
            }
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.paths.css));
});
