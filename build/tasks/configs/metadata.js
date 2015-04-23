module.exports = {
	all: {
		dependencies: {
			"bower.json"  : [ "dependencies" ],
			"package.json": [ "dependencies", "devDependencies" ]
		},
		contributors: {
			minCommits: 2
		},
		dest: "src/metadata.json"
	}
};