export default {
	// auth
	apiAkses:`/api/akses`,
	apiLogin: `/api/login`,
	apiRegister: `/api/register`,
	apiLogout: `/api/logout`,
	apiMe: `/api/me`,
	apiUpdateUser: `/api/user/profile-information`,
	apiForgotPassword: `/api/forgot-password`,
	apiResetPassword: `/api/reset-password`,
	apiUpdatePassword: `/api/user/password`,
	apiEmailVerificationNotification: `/api/email/verification-notification`,
	apiConfirmPasswordStatus: `/api/user/confirmed-password-status`,
	apiConfirmPassword: `/api/user/confirm-password`,

	//2fa
	api2FaEnableDisable: `/api/user/two-factor-authentication`,
	api2FaConfirm: `/api/user/confirmed-two-factor-authentication`,
	api2FaQrCode: `/api/user/two-factor-qr-code`,
	api2FaSecretKey: `/api/user/two-factor-secret-key`,
	apiRecoveryCodes: `/api/user/two-factor-recovery-codes`,
	api2FaChallenge: `/api/two-factor-challenge`,

	//product
	apiProduct: `/api/product`,

	//category
	apiCategory: `/api/category`,
}