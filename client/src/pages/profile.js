import React from 'react'
import Navbar from '../components/navbar'
import TwoFactorAuth from '../components/twoFactorAuth'
import UpdatePassword from '../components/updatePassword'
import ProfileInformation from '../components/profileInformation'

export default function Profile() {
	return (
		<>
			<Navbar />
			<ProfileInformation />
			<UpdatePassword />
			<TwoFactorAuth />
		</>
	)
}
