export const MISSING_FIREBASE_CONTEXT = 'Firebase context is missing.';
export const MISSING_AUTH_USER = 'Authenticated user is missing.';

export const ACCOUNT_ALREADY_EXISITS = {
  CODE: 'auth/account-exists-with-different-credential',
  MESSAGE: `
		An account with an E-Mail address to
		this social account already exists. Try to login from
		this account instead and associate your social accounts on
		your personal account page.
	`,
};

export const EMAIL_ALREADY_IN_USE = {
  CODE: 'auth/email-already-in-use',
  MESSAGE: `
		An account with this E-Mail address already exists.
		Try to login with this account instead. If you think the
		account is already used from one of the social logins, try
		to sign-in with one of them. Afterward, associate your accounts
		on your personal account page.
	`,
};
