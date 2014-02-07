/*
 * grunt-browserifyAliases
 * https://github.com/SportNginLabs/grunt-browserifyAliases
 *
 * Copyright (c) 2013 Kevin Marx
 * Licensed under the private license.
 */

'use strict'

var fs = require('fs')
var _ = require('underscore')

module.exports = function(grunt) {

  function isValidDir(child) {
    return !~child.indexOf('.')
  }

  grunt.registerMultiTask('browserifyAliases', 'sets up the browserify grunt config dynamically', function() {
    // Iterate over all specified file groups.
    _.each(this.data, function(f) {
      var mappings = fs.readdirSync(f.src)
        .filter(isValidDir)
        .map(function(dir) {
          dir = f.dest || dir
          var cwd = f.src
          if (!f.dest) cwd += '/' + dir

          grunt.log.writeln('Mapping ' + cwd.cyan + ' to ' + dir.cyan)

          return {
            cwd: cwd,
            src: f.pattern || ['**/*.js'],
            dest: dir
          }
        })

      for (var a = 0; a < f.env.length; a++) {
        var key = 'browserify.'+f.env[a]+'.options.aliasMappings'
        var cur = grunt.config(key) || []
        grunt.config(key, cur.concat(mappings))
      }
    })

  })

}
