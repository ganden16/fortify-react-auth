import React, {useEffect, useState} from 'react'
import TwoFactorChallengeCode from '../components/twoFactorChallengeCode'
import TwoFactorChallengeRecoveryCode from '../components/twoFactorChallengeRecoveryCode'
import {MDBBtn, MDBContainer} from 'mdb-react-ui-kit'
import axios from '../lib/axios'
import api from '../configs/api'
import {RiseLoader} from 'react-spinners'

export default function TwoFactorChallenge() {
	const [useAnAuthenticationCode, setUseAnAuthenticationCode] = useState(true)
	const [isSuccessLogin, setIsSuccessLogin] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isEnable2Fa, setIsEnable2Fa] = useState(false)

	const handleClickGoProfile = () => {
		window.location = '/profile'
	}
	const handleClickGoHome = () => {
		window.location = '/'
	}

	useEffect(() => {
		axios(api.apiMe).then((res) => {
			if(res.status == 200) {
				setIsSuccessLogin(true)
				setIsLoading(false)
				if(res.data.user.two_factor_confirmed_at) {
					setIsEnable2Fa(true)
				}
			}
		}).catch((err) => {
			setIsLoading(false)
		})
	}, [])

	return (
		<>
			{
				isLoading &&
				<div className="d-flex justify-content-center mt-3">
					Loading...<RiseLoader size={7} color="#239ada" />
				</div>
			}
			{
				!isLoading &&
				<>
					{
						isSuccessLogin &&
						<div className='card'>
							<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
								<div className="mb-3 row">
									<div className="col-sm-10">
										<div className='card p-4'>
											{
												isEnable2Fa && <p className='mb-4'><span className='text-success fw-bold'>You have logged in.</span> If you login using the recovery code, now your recovery code has changed. please keep your new recovery code in your profile</p>
											}
											{
												!isEnable2Fa && <span className='text-success fw-bold'>You have logged in.</span>
											}
										</div>
									</div>
								</div>
								<div className="mb-3 row">
									<div className="col-sm-10">
										{
											isEnable2Fa &&
											<MDBBtn onClick={handleClickGoProfile} color='primary'>
												Go Profile Page
											</MDBBtn>
										}
										{
											!isEnable2Fa &&
											<MDBBtn onClick={handleClickGoHome} color='primary'>
												Go Home
											</MDBBtn>
										}
									</div>
								</div>
							</MDBContainer>
						</div>
					}
					{
						!isSuccessLogin && useAnAuthenticationCode && <TwoFactorChallengeCode setIsSuccessLogin={setIsSuccessLogin} setUseAnAuthenticationCode={setUseAnAuthenticationCode} />
					}
					{
						!isSuccessLogin && !useAnAuthenticationCode && <TwoFactorChallengeRecoveryCode setIsSuccessLogin={setIsSuccessLogin} setUseAnAuthenticationCode={setUseAnAuthenticationCode} />
					}
				</>
			}
		</>
	)
}
