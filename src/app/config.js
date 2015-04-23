/* global requirejs */

/**
 * RequireJS Configuration
 * This will also be used as the requirejs optimization config
 */
requirejs.config({
	

	"map": {
		"*": {
			"nwGui"     : "nwjs/nwGui",
			"nwWindow"  : "nwjs/nwWindow",
			"nwScreen"  : "nwjs/nwScreen"
		}
	},	
	"paths": {
		// RequireJS plugins
		"text": "../vendor/requirejs-text/text",

		// Vendor
		"angularjs"     : "../vendor/angular/angular",		
		"moment"        : "../vendor/momentjs/moment",

		// Application paths
		"root"        : "..",
		"templates"   : "../templates"
	},
	"shim": {
		"app": [ "angularjs"],
		"angular": {
			exports: ['angularjs'],
		}
	}
});