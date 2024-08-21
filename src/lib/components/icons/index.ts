import type { Icon as LucideIcon } from 'lucide-svelte';
import { Bell, Home, Linkedin, Loader2, TriangleAlert, X } from 'lucide-svelte';

import Github from './github.svelte';
import Google from './google.svelte';
import Twitter from './x.svelte';

export type Icon = LucideIcon;

export const Icons = {
	spinner: Loader2,
	google: Google,
	close: X,
	x: Twitter,
	github: Github,
	linkedin: Linkedin,
	home: Home,
	triangleAlert: TriangleAlert,
	bell: Bell
};

export type IconType = any;
