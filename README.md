# Webpack Sass Fail [![Gitter](https://badges.gitter.im/webpack-sass-fail/Lobby.svg)](https://gitter.im/webpack-sass-fail/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

In this project I want to show a (so far) troublesome situation for me. This situation is simplified compared to the real situation (there I am using React) for my company.

## Goal

I want to create a simple pattern library where some global variables, font definitions and patterns are shared across the patterns and the applications. All `@import "colors"` and `@import "typography"` statements in the scss files should reference the files in the folder `./patterns/global/{file}.scss`;

## Problem / situation

It seems like the package `sass-loader` nor the package `node-sass` does support the necessary feature ([Situation described by sass-loader itself](https://github.com/jtangelder/sass-loader#problems-with-url)).

By using the configuration `includePaths` for the `sass-loader` I expected to be able to reference the files via `@import "colors"` and `@import "typography"` or via `@import "_colors.scss"` and `@import "_typography.scss"` statement. By calling `webpack` I got the error report #1.

I also tried to use the resolve-url-loader for my problem. In this case I got the error report #2.

### Error report #1

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


### Error report #2


```

Hash: 0f2ad6d2bedd426d776a
Version: webpack 1.13.2
Time: 605ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.42 kB       0  [emitted]  app
   [0] ./client.js 27 bytes {0} [built]
    + 1 hidden modules

ERROR in ./styles.scss
Module build failed: ModuleBuildError: Module build failed: CssSyntaxError: css-loader!~/projects/webpack-sass-fail/patterns/globals/colors.scss:14:9: Unknown word
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser
    at Input.error (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/input.js:120:22)
    at Parser.unknownWord (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parser.js:457:26)
    at Parser.word (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parser.js:174:14)
    at Parser.loop (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parser.js:60:26)
    at parse (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parse.js:26:16)
    at new LazyResult (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/lazy-result.js:80:24)
    at Processor.process (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/processor.js:200:12)
    at processCss (~/projects/webpack-sass-fail/app/node_modules/css-loader/lib/processCss.js:188:11)
    at Object.module.exports (~/projects/webpack-sass-fail/app/node_modules/css-loader/lib/loader.js:24:2)
    at DependenciesBlock.onModuleBuildFailed (~/projects/webpack-sass-fail/app/node_modules/webpack-core/lib/NormalModuleMixin.js:315:19)
    at nextLoader (~/projects/webpack-sass-fail/app/node_modules/webpack-core/lib/NormalModuleMixin.js:270:31)
    at ~/projects/webpack-sass-fail/app/node_modules/webpack-core/lib/NormalModuleMixin.js:292:15
    at context.callback (~/projects/webpack-sass-fail/app/node_modules/webpack-core/lib/NormalModuleMixin.js:148:14)
    at Object.<anonymous> (~/projects/webpack-sass-fail/app/node_modules/css-loader/lib/loader.js:32:18)
    at ~/projects/webpack-sass-fail/app/node_modules/css-loader/lib/processCss.js:211:3
    at runMicrotasksCallback (internal/process/next_tick.js:58:5)
    at _combinedTickCallback (internal/process/next_tick.js:67:7)
    at process._tickCallback (internal/process/next_tick.js:98:9)
Child extract-text-webpack-plugin:
        + 4 hidden modules

    ERROR in ./~/css-loader!../patterns/globals/colors.scss
    Module build failed: CssSyntaxError: css-loader!~/projects/webpack-sass-fail/patterns/globals/colors.scss:14:9: Unknown word
    You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser
        at Input.error (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/input.js:120:22)
        at Parser.unknownWord (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parser.js:457:26)
        at Parser.word (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parser.js:174:14)
        at Parser.loop (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parser.js:60:26)
        at parse (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/parse.js:26:16)
        at new LazyResult (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/lazy-result.js:80:24)
        at Processor.process (~/projects/webpack-sass-fail/app/node_modules/postcss/lib/processor.js:200:12)
        at processCss (~/projects/webpack-sass-fail/app/node_modules/css-loader/lib/processCss.js:188:11)
        at Object.module.exports (~/projects/webpack-sass-fail/app/node_modules/css-loader/lib/loader.js:24:2)
     @ ./~/css-loader!./styles.scss 3:10-89

    ERROR in ./~/css-loader!../patterns/globals/typography.scss
    Module not found: Error: Cannot resolve 'file' or 'directory' ./colors in ~/projects/webpack-sass-fail/patterns/globals
     @ ./~/css-loader!../patterns/globals/typography.scss 3:10-76


```


## Used packages
- css-loader@0.23.1
- extract-text-webpack-plugin@1.0.1
- node-sass@3.8.0
- sass-loader@4.0.0
- resolve-url-loader@1.6.0
- style-loader@0.13.1
- webpack@1.13.2

## Webpack configuration

```javascript

module.exports = {
  entry: {
    app: './client.js',
    style: './styles.scss'
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css', 'sass') }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  resolveUrlLoader: {
    root: path.join(__dirname, '..', 'patterns', 'globals')
  },
  sassLoader: {
    includePaths: [ path.join(__dirname, '..', 'patterns', 'globals') ]
  }
};
```