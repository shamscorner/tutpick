import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

import sharedConfig from '@shamscorner/config-tailwindcss';

const config: Pick<Config, 'presets' | 'darkMode' | 'content' | 'theme'> = {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	presets: [sharedConfig],
	theme: {
		fontFamily: {
			sans: ['Poppins', ...fontFamily.sans]
		}
	}
};

export default config;
