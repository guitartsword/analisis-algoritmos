module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "react-app",
	"parserOptions": {
		"sourceType": "module"
	},
	"rules": {
		"no-console": 0,
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"linebreak-style": [
			"warn",
			"unix"
		],
		"quotes": [
			"warn",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"jsx-a11y/href-no-hash": "off",
		"jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
	}
};
