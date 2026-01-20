const globals = require('globals');
const pluginJs = require('@eslint/js');
const pluginTs = require('@typescript-eslint/eslint-plugin');
const parserTs = require('@typescript-eslint/parser');
const configPrettier = require('eslint-config-prettier');
const pluginPrettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
	pluginJs.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parser: parserTs,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		plugins: {
			'@typescript-eslint': pluginTs,
			prettier: pluginPrettier,
			'unused-imports': unusedImports
		},
		rules: {
			...pluginTs.configs.recommended.rules,
			'prettier/prettier': 'error',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'prefer-const': 'error',
			'@typescript-eslint/no-empty-function': 'warn',
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': 'warn',
			'@typescript-eslint/prefer-optional-chain': 'warn',
			'no-unused-vars': 'off',
			'no-console': 'warn',
			'no-duplicate-imports': 'error',
			'camelcase': 'off',
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					selector: 'variableLike',
					format: ['camelCase', 'PascalCase', 'UPPER_CASE']
				},
				{
					selector: 'typeLike',
					format: ['PascalCase']
				}
			],
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			],
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: 'import', next: '*' },
				{ blankLine: 'never', prev: 'import', next: 'import' }
			],
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }]
		}
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module'
			}
		},
		rules: {
			'no-unused-vars': 'warn',
			'no-console': 'warn'
		}
	},
	configPrettier
];
