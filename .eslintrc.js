module.exports = {
	env: {
		browser: true,
		es2021: true,
		commonjs: true,
		es6: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	// parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		/**
     \* 错误等级：off(0) | warn(1) | error(2)
     \* 处理方式：never | always
    */
		// "linebreak-style": ["error", "unix"],
		"no-unused-vars": [0],
		"no-empty": 0,
		"prefer-const": ["warn"],
		// "quotes": [
		//     "warn",
		//     "single"
		// ],
		semi: ["warn", "always"],
		"react/prop-types": ["off"],
		// "@typescript-eslint": ["off"],
		// "@typescript-eslint/no-var-requires": ["off"],
		// "@typescript-eslint/explicit-module-boundary-types": ["off"],
		// "@typescript-eslint/no-explicit-any": ["off"],
		// "@typescript-eslint/no-empty-function": ["off"],
		// "@typescript-eslint/no-unused-vars": ["off"],
	},
};
