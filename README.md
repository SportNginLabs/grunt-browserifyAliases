# grunt-browserifyAliases

Dynamically alias files or directories for Browserify.

## Getting Started
This plugin requires Grunt `~0.4.2` and Underscore `1.5.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-browserifyAliases --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-browserifyAliases');
```

## The "browserifyAliases" task

### Overview
In your project's Gruntfile, add a section named `browserifyAliases` to the data object passed into `grunt.initConfig()`.

```js
/*
 * browserifyAliases
 *
 * src     - The target driectory to iterate over
 * dest    - the name of the alias
 * pattern - the globbing pattern
 * env     - The envs you want to target in your browserify config
 *
 */

grunt.initConfig({
  browserifyAliases: {
    directories: [{
      src: 'app/assets/js',
      env: ['prod', 'dev', 'test']
    }, {
      src: 'node_modules/snui',
      dest: 'snui',
      pattern: ['**/*.js', '!**browserify**'],
      env: ['prod', 'dev', 'test']
    }]
  },
});
```


# Deploy to Gemfury

1. `npm pack`
2. `curl -F package=@grunt-browserifyAliases-#.#.#.tgz https://push.fury.io/TOKEN`
