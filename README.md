In this project I want to show a (so far) troublesome situation for me. This situation is simplified compared to the real situation (there I am using React) for my company.

## Goal

I want to create a simple pattern library where some global variables, font definitions and patterns are shared across the patterns and the applications. All `@import "colors"` and `@import "typography"` statements in the scss files should reference the files in the folder `./patterns/global/{file}.scss`;

## Problem / situation

It seems like the package `sass-loader` nor the package `node-sass` doesn't support this feature [Situation described by sass-loader itself](https://github.com/jtangelder/sass-loader#problems-with-url).

By using the configuration `includePaths` for the `sass-loader` I expected to be able to reference the files via `@import "colors"` and `@import "typography"` statement.

### Error report

```
Hash: 396f0bfb9d565b6f60f0
Version: webpack 1.13.2
Time: 522ms
    + 1 hidden modules

ERROR in ./styles.scss
Module build failed: ModuleNotFoundError: Module not found: Error: Cannot resolve 'file' or 'directory' ./colors in ~/projects/webpack-sass-fail/app
    at ~/projects/webpack-sass-fail/app/node_modules/webpack/lib/Compilation.js:229:38
    at onDoneResolving (~/projects/webpack-sass-fail/app/node_modules/webpack/lib/NormalModuleFactory.js:29:20)
    at ~/projects/webpack-sass-fail/app/node_modules/webpack/lib/NormalModuleFactory.js:85:20
    at ~/projects/webpack-sass-fail/app/node_modules/async/lib/async.js:726:13
    at ~/projects/webpack-sass-fail/app/node_modules/async/lib/async.js:52:16
    at done (~/projects/webpack-sass-fail/app/node_modules/async/lib/async.js:241:17)
    at ~/projects/webpack-sass-fail/app/node_modules/async/lib/async.js:44:16
    at ~/projects/webpack-sass-fail/app/node_modules/async/lib/async.js:723:17
    at ~/projects/webpack-sass-fail/app/node_modules/async/lib/async.js:167:37
    at ~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/UnsafeCachePlugin.js:24:19
    at onResolved (~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/Resolver.js:38:18)
    at ~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/Resolver.js:127:10
    at ~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/Resolver.js:191:15
    at applyPluginsParallelBailResult.createInnerCallback.log (~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/Resolver.js:110:4)
    at loggingCallbackWrapper (~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/createInnerCallback.js:21:19)
    at ~/projects/webpack-sass-fail/app/node_modules/tapable/lib/Tapable.js:134:6
    at Tapable.<anonymous> (~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/DirectoryDescriptionFilePlugin.js:24:12)
    at Storage.finished (~/projects/webpack-sass-fail/app/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:38:16)
    at ReadFileContext.callback (~/projects/webpack-sass-fail/app/node_modules/graceful-fs/graceful-fs.js:78:16)
    at FSReqWrap.readFileAfterOpen [as oncomplete] (fs.js:365:13)
Child extract-text-webpack-plugin:
        + 2 hidden modules

    ERROR in ./~/css-loader!./styles.scss
    Module not found: Error: Cannot resolve 'file' or 'directory' ./colors in ~\projects\webpack-sass-fail\app
     @ ./~/css-loader!./styles.scss 3:10-66

    ERROR in ./~/css-loader!./styles.scss
    Module not found: Error: Cannot resolve 'file' or 'directory' ./typography in ~\projects\webpack-sass-fail\app
     @ ./~/css-loader!./styles.scss 4:10-70
```


## Used packages
- css-loader@0.23.1
- extract-text-webpack-plugin@1.0.1
- node-sass@3.8.0
- sass-loader@4.0.0
- style-loader@0.13.1
- webpack@1.13.2

## Webpack configuration

```javascript

module.exports = {
  entry: { style: './styles.scss' },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader') }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  sassLoader: {
    includePaths: [ path.join(__dirname, '..', 'patterns', 'globals') ]
  }
};

```