module.exports = {
	lesssource: {
		files: [ "src/**/*.less" ],
		tasks: [ "less:source" ]
	},
	js: {
		files: [ "src/**/*.js" ],
		tasks: [ "requirejs:dev" ]
	},
	less: {
		files: [ "src/**/*.less" ],
		tasks: [ "less:dev" ]
	},
	html: {
		files: [ "src/**/*.html" ],
		tasks: [ "build" ]
	}
};