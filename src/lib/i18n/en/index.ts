import type { BaseTranslation } from '../i18n-types';

const productName = 'Dollaarr';
const title = `${productName} - Buy and Sell Dollars at the Best Rates`;
const description = `${productName} offers competitive rates for buying and selling dollars online. Secure transactions and real-time dollar rates ensure the best value for your money.`;

const common = {
	login: 'Login',
	logout: 'Logout',
	signup: 'Sign up',
	show: 'Show',
	hide: 'Hide',
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
	keywords: `Buy dollars online, sell dollars online, best dollar exchange rates, competitive currency exchange, secure dollar transactions, online dollar marketplace, dollar exchange platform, real-time dollar rates, currency exchange services, hassle-free dollar trading, dollar exchange community, online dollar trading, dollar to local currency exchange, best place to buy dollars, best place to sell dollars, ${productName}`,
	appTwitterAccount: '@shamscorner',

	common,

	appLogo: {
		hrefTitle: description,
		alt: `${productName} Logo`
	},

	schemaMarkup: {
		type: 'Corporation',
		name: 'Memowise Inc.',
		markupDescription:
			'Memowise is a software company that builds products to help people. We are a small team of passionate developers, designers, and entrepreneurs. We are based in Dhaka, Bangladesh.',
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
				email: 'memowiseinc@gmail.com',
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
		title: 'A production ready starter template for SvelteKit.',
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
			continueWith: 'Or continue with',
			dontHaveAccount: "Don't have an account?",
			forgotPassword: 'Forgot password?',
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
