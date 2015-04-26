module.exports = {
	build: {
		expand: true,
		cwd   : "src",
		src   : [
			"package.json",
			"index.html",
			"app/alarm.ogg",
			"app/templates/*",
			"vendor/requirejs/require.js",
			"vendor/angular/angular.js",					
        	"vendor/angularAMD/angularAMD.min.js",
        	"vendor/angular-animate/angular-animate.min.js",
        	"vendor/angular-audio/app/angular.audio.js",
        	"vendor/momentjs/moment",   
        	"/vendor/angular-bootstrap/ui-bootstrap.min.js",
        	"/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js",
			"vendor/typicons/*/**",
			"img/**"
		],
		dest  : "build/tmp",
	}, 
	linux32scripts: {
		options: { mode: 493 }, // 0755 (js strict mode)
		expand : true,
		flatten: true,
		src    : "build/resources/linux/*.sh",
		dest   : "build/releases/<%= package.name %>/linux32/"
	},
	linux64scripts: {
		options: { mode: 493 }, // 0755 (js strict mode)
		expand : true,
		flatten: true,
		src    : "build/resources/linux/*.sh",
		dest   : "build/releases/<%= package.name %>/linux64/"
	},

	linux32icons: {
		expand : true,
		flatten: true,
		src    : "build/resources/icons/*.png",
		dest   : "build/releases/<%= package.name %>/linux32/icons/"
	},
	linux64icons: {
		expand : true,
		flatten: true,
		src    : "build/resources/icons/*.png",
		dest   : "build/releases/<%= package.name %>/linux64/icons/"
	}
};