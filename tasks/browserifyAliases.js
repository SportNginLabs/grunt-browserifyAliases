/*
 * grunt-browserifyAliases
 * https://github.com/SportNginLabs/grunt-browserifyAliases
 *
 * Copyright (c) 2013 Kevin Marx
 * Licensed under the private license.
 */

'use strict'

var fs = require('fs')

module.exports = function(grunt) {

  grunt.registerMultiTask('browserifyAliases', 'sets up the browserify grunt config dynamically', function() {

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var dirs = fs.readdirSync(f.src)
      for (var i = dirs.length; i; i--) {
        if (dirs[i] && dirs[i].match(/\./g)) dirs.splice(i, 1)
      }

      var mappings = dirs.map(function(dir) {
        var cwd = f.src + '/' + dir
        grunt.verbose.writeln('Mapping ' + cwd.cyan + ' to ' + dir.cyan)
        return {
          cwd: cwd,
          src: ['**/*.js'],
          dest: dir
        }
      })

      var envs = f.dest.split(',')
      for (var i = 0; i < envs.length; i++) {
        var key = 'browserify.'+envs[i]+'.options.aliasMappings'
        var cur = grunt.config(key) || []
        grunt.config(key, cur.concat(mappings))
      }

    })
  })

}
