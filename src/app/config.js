/* global requirejs */

/**
 * RequireJS Configuration
 * This will also be used as the requirejs optimization config
 */
requirejs.config({
	

	"map": {
		"*": {
			"nwGui"     : "../nwjs/nwGui",
			"nwWindow"  : "../nwjs/nwWindow",
		}
	},	
	"paths": {
		// RequireJS plugins
		"text": "../vendor/requirejs-text/text",

		// Vendor
		"angular"     	    : "../vendor/angular/angular",	
        'angularAMD'        : "../vendor/angularAMD/angularAMD.min",
        'angular-animate'   : "../vendor/angular-animate/angular-animate.min",
        'angular-audio'     : "../vendor/angular-audio/app/angular.audio",
        "angular-bootstrap"	: "../vendor/angular-bootstrap/ui-bootstrap.min",
        "angular-tpls"		: "../vendor/angular-bootstrap/ui-bootstrap-tpls.min",

		"moment"        	: "../vendor/momentjs/moment",

		// Application paths
		"root"        : "..",
		"templates"   : "../templates",

	},
    shim: { 'angularAMD': ['angular','angular-animate','angular-audio','moment','angular-bootstrap','angular-tpls'] },
    deps: ['app']

	
});