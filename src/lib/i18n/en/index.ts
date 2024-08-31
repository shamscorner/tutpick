import type { BaseTranslation } from '../i18n-types';

const productName = 'Tutpick';
const title = `${productName} - Your one and only starter template for your next dream project.`;
const description = `${productName} is a production ready starter template. It uses all the latest greatest technologies that setup out of the box. In this way you are saving a whole lot of time and your money. It is a perfect starting point for your next dream project. Do not spend time most of your time doing the same thing over and over again. Spend your time on the things that matter the most.`;

const common = {
	login: 'Login',
	logout: 'Logout',
	signup: 'Sign up',
	show: 'Show',
	hide: 'Hide',
	back: 'Back',
	or: 'Or',
	toggleTheme: 'Toggle theme',
	close: 'Close',
	toggleNotification: 'Toggle notification',
	toggleNavigationMenu: 'Toggle navigation menu',
	toggleUserMenu: 'Toggle user menu',
	submit: 'Submit',
	remove: 'Remove',
	unknown: 'Unknown',
	sell: 'Sell',
	buy: 'Buy',
	somethingWrong: 'Something went wrong! Please contact support.',
	copied: 'Copied!',
	reset: 'Reset',
	scrollDownToLoadMore: 'Scroll down to load more',
	view: 'View',
	toggleColumns: 'Show / Hide columns',
	pickDate: 'Pick a date'
};

const en: BaseTranslation = {
	appName: productName,
	title,
	description,
	keywords: `${productName}, SvelteKit, TailwindCSS, TypeScript, Vite, Svelte, SvelteKit template, SvelteKit starter template, SvelteKit production ready template, SvelteKit production ready starter template, SvelteKit production ready starter template with TailwindCSS, SvelteKit production ready starter template with TypeScript, SvelteKit production ready starter template with Vite, SvelteKit production ready starter template with Svelte, SvelteKit production ready starter template with SvelteKit template, SvelteKit production ready starter template with SvelteKit starter template, SvelteKit production ready starter template with SvelteKit production ready template, SvelteKit production ready starter template with SvelteKit production ready starter template, SvelteKit production ready starter template with SvelteKit production ready starter template with TailwindCSS, SvelteKit production ready starter template with SvelteKit production ready starter template with TypeScript, SvelteKit production ready starter template with SvelteKit production ready starter template with Vite, SvelteKit production ready starter template with SvelteKit production ready starter template with Svelte, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit template, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit starter template, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit production ready template, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit production ready starter template with TailwindCSS, SvelteKit production ready starter template with SvelteKit production ready starter template with TypeScript, SvelteKit production ready starter template with SvelteKit production ready starter template with Vite, SvelteKit production ready starter template with SvelteKit production ready starter template with Svelte, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit template, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit starter template, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit production ready template, SvelteKit production ready starter template with SvelteKit production ready starter template with SvelteKit production ready starter template with TailwindCSS, SvelteKit production ready starter template with SvelteKit production ready starter template with TypeScript, SvelteKit production ready starter template with SvelteKit production ready starter template, ${productName}`,
	appTwitterAccount: '@shamscorner',

	common,

	appLogo: {
		hrefTitle: description,
		alt: `${productName} Logo`
	},

	schemaMarkup: {
		type: 'LLC',
		name: 'shamscorner LLC',
		markupDescription:
			'shamscorner LLC is a software company that builds products to help people. We are a small team of passionate developers, designers, and entrepreneurs. We are based in Dhaka, Bangladesh.',
		founder: [
			{
				type: 'Person',
				name: 'Shamim Hossain'
			},
			{
				type: 'Person',
				name: 'Masud Rana'
			},
			{
				type: 'Person',
				name: 'Shadman Nasif'
			}
		],
		foundingDate: '2023-10-02',
		contactPoint: [
			{
				type: 'ContactPoint',
				email: 'support@shamscorner.com',
				telephone: '',
				contactType: 'customer service'
			}
		]
	},

	errorPage: {
		title: '404',
		subtitle: 'Not found',
		pageTitle: '404',
		description: 'Looking for help? Reach out to us at contact@shamscorner.com',
		keywords: 'Support, Contact, Help, 404, Not found',
		backToHome: 'Back to home'
	},

	homepage: {
		title,
		subtitle: description
	},

	loginPage: {
		title: 'Welcome back!',
		pageTitle: 'Log in',
		description:
			'Enter your email below and we will send you a magic link to log in to your email account.',
		keywords: 'Login, Sign in, Log in, Sign up, Register',

		form: {
			email: 'Email',
			password: 'Password',
			submit: 'Send Magic Link',
			rememberMe: 'Remember me?',
			continueWithGoogle: 'Continue with Google',
			success: 'Login link sent to your email. Use the link to login.'
		},

		errors: {
			failedSignInGoogle: 'Failed to sign in with Google. Please use email on the login page'
		}
	},

	twoFAPage: {
		title: 'Two Factor Authentication',
		pageTitle: 'Two Factor Authentication',
		description: 'Enter the code from your authenticator app to verify your account.',
		keywords: 'Two factor authentication, 2FA, Multi factor authentication, MFA',

		form: {
			code: 'Code',
			submit: 'Verify',
			tryDifferentMethod: 'Try a different method'
		}
	},

	dashboardPage: {
		title: 'Dashboard',
		pageTitle: 'Dashboard',
		description: 'Welcome to your dashboard.',
		keywords: 'Dashboard, Home, Welcome',

		navigations: {
			dashboard: 'Dashboard',
			transactions: 'Transactions',
			savedCards: 'Saved Cards',
			howTo: 'How to'
		},

		userDropdown: {
			myAccount: 'My Account',
			profile: 'My Profile',
			settings: 'Settings',
			logout: 'Logout'
		}
	},

	myProfilePage: {
		title: 'My Profile',
		pageTitle: 'My Profile',
		description: 'Update your profile information.',
		keywords: 'Profile, Account, Settings',

		form: {
			id: 'ID',
			name: 'Name',
			email: 'Email',
			twoFactorAuth: {
				title: 'Two Factor Authentication',
				subtitle: 'Enable or disable two factor authentication for your account.'
			},
			role: 'Role',
			submit: 'Update Profile',
			successStatus: 'Profile updated successfully!'
		},

		changeEmail: {
			title: 'Change Email Address',
			subtitle:
				'Update your email address. A verification email will be sent to your new email address.',
			submit: 'Change email',
			successStatus: 'A verification email sent to your new email address.'
		}
	},

	settingsPage: {
		title: 'Settings',
		pageTitle: 'Settings',
		description: 'Update your overall application settings.',
		keywords: 'Settings, Account, Preferences, notification',

		form: {
			darkMode: {
				title: 'Use dark Theme',
				subtitle: 'I know you love dark mode, we all are 🥰. So, here you go!'
			}
		}
	},

	transactionsPage: {
		title: 'Transactions',
		pageTitle: 'Transactions',
		description: 'View all your transactions here.',
		keywords: 'Transactions, History, Logs, Details',

		statuses: {
			pending: 'Pending',
			review: 'Review',
			hold: 'Success',
			done: 'Failed',
			canceled: 'Canceled'
		},

		table: {
			id: 'Transaction ID',
			amount: 'Amount',
			status: 'Status',
			createdAt: 'Created At',
			user: {
				name: 'User',
				email: 'Email'
			},
			noResults: 'No transactions found.'
		}
	},

	notifications: {
		title: 'Notifications',
		subtitle: 'Latest notifications are shown first.',
		actions: {
			onlyUnread: 'Only Unread',
			markAllAsRead: 'Mark all as read',
			showAllNotifications: 'Show all notifications'
		}
	},

	errors: {
		somethingWentWrong: 'Something went wrong'
	}
};

export default en;
