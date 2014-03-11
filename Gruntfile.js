'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
	  connect: {
        target:{
            options: {
                port: 9001,
                keepalive: true
            	}
        	}
    	}
	});

	grunt.registerTask('default', [
	'connect:target'
	]);
}