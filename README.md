# Epiphany Boilerplate

This is our Front End Development boilerplate project, a continuous development tool built using Grunt. It's packed full of features for our particular workflow that hopefully will help you too!

## Requirements

There are a number of NPM global packages needed to build the project:

```bash
$ npm install -g grunt-cli
$ npm install -g jspm
```

Once installed, gather your dependencies via:

```bash
$ npm install
$ jspm install
```

## Starting point for project using Node.js, Grunt, JSPM, NPM.

### Node.js

This boilerplate is structured around several Node.js tools, which aim to reduce repetitive dev tasks and improve page load times of your final product by using concatenation, minification and image compression by default. It will also give you auto-prefixing on every save of your CSS and allow livereload of the page whenever you save in your editor.

### Grunt

Introduce a build process to easily deliver linted, concatenated, minified CSS and JavaScript files. Also compress your images to further reduce your page load times.

### JSPM

A Package Manage that can install from multiple sources: NPM, GitHub or any url. JSPM comes with System.js by default, which is a polyfill for the upcoming System object in JavaScript. It also comes with Babel which allows for ES6 and above features to be transpiled into ES5 on the fly. This is still pretty experimental stuff so test it thoroughly if you use any ES6+ features.

JSPM also includes a module compiler that supports AMD, CommonJS and a mix of both to compile the app down into one file. Previously we used Require.js to do this, as Require is used the AMD model this is also supported.

### NPM

NPM should only be used for installing development packages, JSPM should be used if you need any JS to run on the website (jQuery etc).

## Project Structure

### /build/

Builds of the website will end up, in `/build/dev/` and `/build/dist/`. The dev task and dist uploads will target here.

### /config/

Grunt task configuration files are kept in here, alter them to suit your needs. One worth noting:

 - `_config.js`: main project config file. This is the boilerplate's own config files, it affects how the project is setup/build.

### /src/

This is where all code you write/edit lives. During a build of the project, most items are copied by default into the `/assets/` folder. You can change this by editing the `assets` property in `/config/_config.js`.

 - `html/`: EJS is used as the templating langauge. This folder contains two subfolders: `pages` (which are what is built) and `partial` (which is what is included to build the pages.
 - `js/`: JSPM will target `js/app.js` and compile a single file from your app.
 - `sass/`: Sass files are passed through to PostCSS. Our configuration used libsass to compile to CSS then Autoprefixer to give vendor prefixes.
 - `assets/`: this is indended for static assets, i.e.: images, fonts and other media.

### /tasks/

Custom grunt tasks. Your own grunt tasks can be added here.

### /package.json

This is your project's management file, all devtime and runtime dependencies are defined in here. To install all of these you just need to issue a "npm install" command from the root of the project. As this project setup for build static assets (Front end stuff only) we have all the packages installed as developer dependencies.

## Development

All Epiphany grunt tasks are defined in `Gruntfile.js` and prefixed with `[EP]`. To see all available grunt tasks run:

```bash
$ grunt --help
```

### Continous Development

The Grunt Boilerplate serves as a build tool that will also host the website for you locally during development. To build your project and start the continuous development setup run:

```
grunt dev
```

This will build your project and then watch for any changes and do those individually.

You should write all your CSS in `src/sass/screen.scss`. If you've not used SASS before, don't worry, just write normal CSS and you'll be fine.

Grunt generates an autoprefixed screen.css file every time screen.scss is saved. The browser will automatically inject the updated CSS without a page reload on save.

Your JavaScript code should be written using the AMD or CommonJS pattern with files being saved to the `js/app` folder. All vendor scripts should be installed with JSPM as they will be included automatically in your compiled JS app.

During development System.js will load your scripts asynchronously from the js/app.js entry point file.

Changes to any file in `/src/` will trigger a hard reset in the browser, with the exception of Sass files, which trigger a soft-css reload.

### Fonts

There is a custom SASS function writen in Node.js (see `config/sass.js`) that will Base64 encode fonts in your screen.scss ensure your fonts are loaded when your css does. It does increase the size of the CSS but the trade off is that the font-flicker is completely eliminated. The functionality is completely opt in and example useage can be found in `src/sass/core/_typography.scss`.

The function takes two arguments `base64($font-name, $content-type = '')` with the latter being optional. The function looks in `src/assets/fonts/` for any font you try to encode and defaults to the file extension of the font as the content type.

```
@font-face {
    src: url(base64font('my-font.woff'));
    font-family: 'My Font';
}

@font-face {
    src: url(base64font('another-font.custom', 'font/woff'));
    font-family: 'Another Font';
}
```

### Building the Project

You can trigger the dev and dist build process seperatly by eith of the following:

```bash
$ grunt build     # builds /build/dist/
$ grunt build-dev # builds /build/dev/
```

Each time a build task is ran the existing directory is deleted before the build starts.

## Deploying to Live

When your project is finished and you want to package everything up to send to the client, you should run the following grunt command.

```
grunt live
```

This first performs `grunt build` then bumps your major package version number. Your CSS and JavaScripts will be concatenated and minified (we still keep Modernizr seperate as we want that to load before the body). It will also optimise all your images by compressing pngs and gifs. It will add the social media scripts for Facebook, Twitter and Google Plus One at the foot of the page, and Google Analytics code at the top (you can remove the social scripts include if they are not needed).

**N.B. You will need to manually enter the Analytics ID in src/html/partials/core/analytics.ejs.**

The `/build/dist/` folder can then be zipped and sent over to the client.
