# GpWPTDTk™

Grunt powered Wordpress Theme Development Toolkit.

GpWPTDTk is built on a couple of different components:

* [\_s (underscores)](https://github.com/automattic/_s) – the "starter theme" from the people behind Wordpress (Automattic).
* [Foundation](https://github.com/zurb/foundation) – an awesome framework for web design from ZURB.

And then there are a couple of tools that basically does all the magic:

* [Grunt](http://gruntjs.com)
* [Compass](http://compass-style.org)
* [Bower](http://bower.io)

## Setup

You need a couple of tools to start.

* [Ruby](https://www.ruby-lang.org) (with [Bundler](http://bundler.io))
* [node.js](http://nodejs.org) (with [npm](https://www.npmjs.org))

```bash
$ rbenv install # install a ruby
$ bundle install # install gems
$ npm install -g bower # install bower
$ npm install -g grunt-cli # install grunt
$ npm install # install local requirements
$ bower install # install foundation and stuff
```