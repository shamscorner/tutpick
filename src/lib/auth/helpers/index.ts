export function generatePassword(passwordLength: number): string {
	const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
	const upperCaseLetters = lowerCaseLetters.toUpperCase();
	const numbers = '0123456789';
	const specialCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
	const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

	let password = '';
	for (let i = 0; i < passwordLength; i++) {
		const randomIndex = Math.floor(Math.random() * allCharacters.length);
		password += allCharacters[randomIndex];
	}

	return password;
}

export function getBrowserNameFromHint(SecChUa: string) {
	if (!SecChUa) return 'Unknown';

	const isMatched = (str: string) => SecChUa.toLowerCase().includes(str.toLowerCase());

	if (isMatched('Brave')) return 'Brave';
	if (isMatched('Chrome')) return 'Chrome';
	if (isMatched('Firefox')) return 'Firefox';
	if (isMatched('Safari')) return 'Safari';
	if (isMatched('Opera')) return 'Opera';
	if (isMatched('Edge')) return 'Edge';

	return 'Unknown';
}
