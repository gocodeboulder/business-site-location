module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        bowercopy:
            options:
                clean: true
            libs:
                options:
                    destPrefix: 'js/libs'
                files:
                    'angular.js':   'angular/angular.min.js'
                    'angular-leaflet.js': 'angular-leaflet/dist/angular-leaflet-directive.min.js'
                    'leaflet.js':   'leaflet-dist/leaflet.js'
                    'bootstrap.js':  'bootstrap/dist/js/bootstrap.min.js'
                    'jquery.js':    'jquery/dist/jquery.min.js'
            cssLibs:
                options:
                    destPrefix: 'css/libs'
                files:
                    'bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css'


    grunt.loadNpmTasks 'grunt-bowercopy'

    grunt.registerTask 'default', [
        'bowercopy'
    ]