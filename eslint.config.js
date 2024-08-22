import SvelteEslintConfig from '@shamscorner/config-eslint';

export default [
	...SvelteEslintConfig,
	{
		rules: {
			'svelte/valid-compile': 'warn'
		}
	}
];
