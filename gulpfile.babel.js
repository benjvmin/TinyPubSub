/*             Asset Construct           */
class path {
  constructor(src, dest) {
    this.src = src;
    this.dest = dest;
  }
}

/*             Asset Pathways            */
//Production CSS Path (source, destionation)
const cssPath = new path('prod/css/*.css', 'prod/css');

//Sass Path
const sassPath = new path('dev/sass/*.scss', 'prod/css');

//Pug File Paths
const pugPath = new path('dev/pug/**/*.pug', 'prod');
pugPath.baseFiles = "dev/pug/*.pug";
pugPath.templateDir = "dev/pug";

//Javascript file pathways
const jsPath = new path('dev/js/**/*.js', 'prod/js');
jsPath.entry = 'dev/js/main.js';

//Asset pathways 
const assetPath = new path('dev/assets', 'prod/assets');


/*             Gulp Plugins            */
import gulp from 'gulp';

//Compile Sass
import sass from 'gulp-sass';

//Enables local serves with live reloading
import browserSync from 'browser-sync';

//Compile Pug files to HTML
import pug from 'gulp-pug';

//Easy Error handling in gulp
import plumber from 'gulp-plumber';

//Enable Sourcemapping
import sourceMaps from 'gulp-sourcemaps';

// Allows extended files to be compiled with pug files
import pugInheritence from 'gulp-pug-inheritance';

//Default ES6 Module Bundling
import rollup from 'gulp-better-rollup';

//Convert ES5 to ES6
import gulpbabel from 'gulp-babel';

// Minimize Javascript Files
import uglify from 'gulp-uglify';

//Output file size of all files passed through pipeline
import size from 'gulp-size';

//Caches files for quicker loading
import cached from 'gulp-cached';

import svgGo from 'gulp-svgmin';

import svgSprite from 'gulp-svg-sprite';


/*             Post CSS Plugins            */
import postCSS from 'gulp-postcss';

//Prefix CSS for browser Support
import autoprefixer from 'autoprefixer';

//List browser support of CSS that is being used
import doiuse from 'doiuse';

//Automates browser bug fixes 
import postCSSFixes from 'postcss-fixes';

//Minify and optimize CSS
import cssnano from 'cssnano';

//Groups media queries
import mqpacker from 'css-mqpacker';

///Resolves Filepath names
import assets from 'postcss-assets';

//Enables More Native Timing Functions
import timingFunction from 'postcss-timing-function';

//Enables Quantity Queries 
import quantityQueries from 'postcss-quantity-queries';

//Array of PostCSS plugins
const processors = [
    assets({
        loadPaths: [assetPath.src]
    }),
    quantityQueries,
    timingFunction,
    mqpacker,
    autoprefixer,
    postCSSFixes,
    cssnano({preset: ['default']})
];

//Console log Browser Support for certain features
gulp.task('browserSupport', () => gulp.src(cssPath.src).pipe(
  postCSS([
    doiuse({
      onFeatureUsage(usageInfo) {
        console.log(usageInfo.message);
      }
    })
  ])
));

//Serve files from localhost
gulp.task('serve', () => {
  browserSync.init({
    server: './prod'
  });
});


//Compile Pug & Pug templates
gulp.task('pug', () => {
  return gulp
    .src(pugPath.baseFiles)
    .pipe(pugInheritence({
        basedir: pugPath.templateDir,
        skip: "node_modules"
      }))
    .pipe(pug({ locals: {}, pretty: true }))
    .pipe(size())
    .pipe(gulp.dest(pugPath.dest))
    .pipe(browserSync.stream());
});

//Compile SASS & Intergrate Post CSS Plugins 
gulp.task("sass", () =>
  gulp
    .src(sassPath.src)
    .pipe(plumber())
    .pipe(cached())
    .pipe(sass())
    .pipe(sourceMaps.init())
    .pipe(postCSS(processors))
    .pipe(sourceMaps.write())
    .pipe(size())
    .pipe(gulp.dest(sassPath.dest))
    .pipe(browserSync.stream())
);

//Compile, Bundle, & Convert ES6 to ES5
gulp.task('js', () => {
  gulp
    .src(jsPath.entry)
    .pipe(plumber())
    .pipe(cached())
    .pipe(sourceMaps.init())
    .pipe(rollup({ plugins: [], format: 'es' }))
    .pipe(gulpbabel())
    .pipe(uglify())
    .pipe(sourceMaps.write())
    .pipe(size())
    .pipe(gulp.dest(jsPath.dest))
    .pipe(browserSync.stream());
});


//Assets
gulp.task('optimizeSvg',() => {
  
});


//Default Task to start up web server & enable hot reloading
gulp.task('default', ['sass', 'pug', 'js', 'serve'], () => {
  gulp.watch(sassPath.src, ['sass']);
  gulp.watch(pugPath.src, ['pug']);
  gulp.watch(jsPath.src, ['js']);
});
