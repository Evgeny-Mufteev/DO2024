const pathSrc = "./src/"
const pathDest = "./dist/"
const pathBuild = "./docs/"

const taskDev = "./task/dev/"
const taskBuild = "./task/build/"

module.exports = {
  rootSrc: pathSrc,
  rootDest: pathDest,
  rootBuild: pathBuild,
  taskDev: taskDev,
  taskBuild: taskBuild,

  html: {
    src: pathSrc + "*.html",
    watch: pathSrc + "**/*.html",
    dest: pathDest,
    build: pathBuild
  },
  scss: {
    src: pathSrc + "scss/*.{sass,scss}",
    watch: pathSrc + "scss/**/*.{sass,scss}",
    dest: pathDest + "css/",
    build: pathBuild + "css/"
  },
  js: {
    src: pathSrc + "js/*.js",
    watch: pathSrc + "js/**/*.js",
    dest: pathDest + "js/",
    build: pathBuild + "js/"
  },
  img: {
    src: pathSrc + "assets/img/**/*.{png,jpg,jpeg,gif,svg}",
    watch: pathSrc + "assets/img/**/*.{png,jpg,jpeg,gif,svg}",
    dest: pathDest + "assets/img/",
    build: pathBuild + "assets/img/"
  },
  fonts: {
    src: pathSrc + "assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    watch: pathSrc + "assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    dest: pathDest + "assets/fonts/",
    build: pathBuild + "assets/fonts/"
  },
  svg: {
    src: pathSrc + "assets/svg/**/*.svg",
    watch: pathSrc + "assets/svg/**/*.svg",
    dest: pathDest + "assets/svg/",
    build: pathBuild + "assets/svg/"
  },
  plugins: {
    src: pathSrc + "assets/plugins/**/*.*",
    watch: pathSrc + "assets/plugins/**/*.*",
    dest: pathDest + "assets/plugins/",
    build: pathBuild + "assets/plugins/"
  },
  files: {
    src: pathSrc + "assets/files/**/*.*",
    watch: pathSrc + "assets/files/**/*.*",
    dest: pathDest + "assets/files/",
    build: pathBuild + "assets/files/"
  }
}