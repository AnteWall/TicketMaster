module.exports = function( grunt ) {
	"use strict";

	var platforms = require( "../common/platforms" );

	grunt.task.registerTask(
		"release",
		"Build and compile the project. " + platforms.getList(),
		function() {
			grunt.task.run( []
				// make a fresh build
				.concat([ "buildrelease" ])
				// compile
				.concat( platforms.getTasks( grunt, "compile", arguments ) )
			);
		}
	);

};