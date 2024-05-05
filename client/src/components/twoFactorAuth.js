import {MDBBtn, MDBInput} from 'mdb-react-ui-kit'
import React, {useEffect, useState} from 'react'
import axios from '../lib/axios'
import api from '../configs/api'
import ConfirmPassword from './confirmPassword'
import Swal from 'sweetalert2'
import {RiseLoader} from 'react-spinners'

export default function TwoFactorAuth() {
	const [isEnable2Fa, setIsEnable2Fa] = useState(false)
	const [isConfirmPassword, setIsConfirmPassword] = useState(false)
	const [isEnabling, setIsEnabling] = useState(false)
	const [recoveryCodes, setRecoveryCodes] = useState([])
	const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)
	const [confirmCode2Fa, setConfirmCode2Fa] = useState({
		code: ''
	})
	const [responseEnable2Fa, setResponseEnable2Fa] = useState({
		svg: '',
		secretKey: ''
	})
	const [isLoading, setIsLoading] = useState(true)

	const handleClickEnable2Fa = async () => {
		try {
			const res1 = await axios(api.apiConfirmPasswordStatus)
			if(res1.status == 200) {
				if(!res1.data.confirmed) {
					setIsConfirmPassword(true)
					return
				}
			}
			Swal.fire({
				title: 'Enable 2Fa?',
				text: "Anda akan mengaktifkan 2Fa",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak'
			}).then(async (result) => {
				if(result.isConfirmed) {
					try {
						const res2 = await axios.post(api.api2FaEnableDisable)
						if(res2.status == 200) {
							setIsEnabling(true)
							const res3 = await axios(api.api2FaQrCode)
							if(res3.status == 200) {
								setResponseEnable2Fa((prev) => ({
									...prev,
									svg: res3.data.svg
								}))
							}
							const res4 = await axios(api.api2FaSecretKey)
							if(res4.status == 200) {
								setResponseEnable2Fa((prev) => ({
									...prev,
									secretKey: res4.data.secretKey
								}))
							}
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: 'One more step to enable 2fa',
								showConfirmButton: false,
								timer: 1500
							})
						}
					} catch(error) {
						console.log(error)
						Swal.fire({
							icon: 'error',
							title: 'Error ' + error.response.status,
							text: 'Try again!',
						})
					}
				}
			})
		} catch(error) {
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Error ' + error.response.status,
				text: 'Try again!',
			})
		}
	}
	const handleClickConfirm2Fa = async () => {
		try {
			const response = await axios.post(api.api2FaConfirm, {
				code: confirmCode2Fa.code
			})
			if(response.status == 200) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: '2Fa has been activated successfuly',
					showConfirmButton: false,
					timer: 2000
				})
			}
			const res2 = await axios(api.apiRecoveryCodes)
			if(res2.status == 200) {
				setRecoveryCodes(res2.data)
				setIsEnabling(false)
				setIsEnable2Fa(true)
				setShowRecoveryCodes(true)
			}
		} catch(error) {
			console.log(error)
			if(error.response.status == 422) {
				Swal.fire({
					icon: 'error',
					title: 'Code confirmation is wrong',
					text: 'Try again!',
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error ' + error.response.status,
					text: 'Try again!',
				})
			}
		}
	}

	const handleClickShowRecoveryCodes = async () => {
		try {
			const res1 = await axios(api.apiConfirmPasswordStatus)
			if(res1.status == 200) {
				if(!res1.data.confirmed) {
					setIsConfirmPassword(true)
					return
				}
			}
			const res = await axios(api.apiRecoveryCodes)
			if(res.status == 200) {
				setShowRecoveryCodes(true)
				setRecoveryCodes(res.data)
			}
		} catch(error) {
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Error ' + error.response.status,
				text: 'Try again!',
			})
		}
	}

	const handleClickRegenerateRecoveryCodes = async () => {
		try {
			const res1 = await axios(api.apiConfirmPasswordStatus)
			if(res1.status == 200) {
				if(!res1.data.confirmed) {
					setIsConfirmPassword(true)
					return
				}
			}
			const res = await axios.post(api.apiRecoveryCodes)
			if(res.status == 200) {
				const res2 = await axios(api.apiRecoveryCodes)
				setRecoveryCodes(res2.data)
			}
		} catch(error) {
			Swal.fire({
				icon: 'error',
				title: 'Error ' + error.response.status,
				text: 'Try again!',
			})
		}
	}

	const handleClickDisable2Fa = async () => {
		try {
			const res1 = await axios(api.apiConfirmPasswordStatus)
			if(res1.status == 200) {
				if(!res1.data.confirmed) {
					setIsConfirmPassword(true)
					return
				}
			}
			Swal.fire({
				title: 'Disable 2Fa?',
				text: "Anda akan menonaktifkan 2Fa",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak'
			}).then(async (result) => {
				if(result.isConfirmed) {
					try {
						const response = await axios.delete(api.api2FaEnableDisable)
						setIsEnable2Fa(false)
						setShowRecoveryCodes(false)
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: '2Fa has been disabled successfuly',
							showConfirmButton: false,
							timer: 2000
						})
					} catch(error) {
						console.log(error)
						Swal.fire({
							icon: 'error',
							title: 'Error ' + error.response.status,
							text: 'Try again!',
						})
					}
				}
			})
		} catch(error) {
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Error ' + error.response.status,
				text: 'Try again!',
			})
		}
	}

	const handleCancel2Fa =  () => {
		Swal.fire({
			title: 'Cancel 2Fa?',
			text: "Anda akan membatalkan pengaktifan 2fa",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya',
			cancelButtonText: 'Tidak'
		}).then(async (result) => {
			if(result.isConfirmed) window.location.reload()
		})
	}
	useEffect(() => {
		axios.get(api.apiMe).then((res) => {
			if(res.status == 200) {
				res.data.user.two_factor_confirmed_at && setIsEnable2Fa(true)
			}
			setIsLoading(false)
		})
	}, [])

	return (
		<>
			{
				isLoading &&
				<div className="d-flex justify-content-center">
					Loading...<RiseLoader size={7} color="#239ada" />
				</div>
			}
			{
				!isLoading &&
				<>
					{
						isConfirmPassword && <ConfirmPassword setIsConfirmPassword={setIsConfirmPassword} />
					}
					<div className='py-3 d-flex justify-content-center'>
						<div className="card w-75">
							<div className="card-body">
								<div>
									<h3 className='text-center'>Two Factor Authentication</h3>
									<p className='text-center mb-5'>Add additional security to your account using two factor authentication.</p>
									<div className="mb-3 row">
										<label className="col-sm-2 col-form-label">Status</label>
										<div className="col-sm-10">
											{
												isEnable2Fa && !isEnabling && <h6 className='text-success'>You have enabled two factor authentication.</h6>
											}
											{
												!isEnable2Fa && !isEnabling && <h6 className='text-danger'>You have not enabled two factor authentication.</h6>
											}

											{
												!isEnable2Fa && isEnabling && <h6 className='text-warning'>Finishing two factor authentication.</h6>
											}
										</div>
									</div>
									<div className="mb-3 row">
										<label className="col-sm-2 col-form-label">Detail</label>
										<div className="col-sm-10">
											<p>When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.</p>
										</div>
									</div>
									{
										showRecoveryCodes &&
										<div className="mb-3 row">
											<label className="col-sm-2 col-form-label">Recovery Codes</label>
											<div className="col-sm-10">
												<div className='card p-4'>
													<p className='mb-4'>Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost:</p>
													<div className='d-flex justify-content-evenly'>
														{
															recoveryCodes.length > 0 &&
															<>
																<div className=''>
																	<li>{recoveryCodes[0]}</li>
																	<li>{recoveryCodes[1]}</li>
																	<li>{recoveryCodes[2]}</li>
																	<li>{recoveryCodes[3]}</li>
																</div>
																<div className=''>
																	<li>{recoveryCodes[4]}</li>
																	<li>{recoveryCodes[5]}</li>
																	<li>{recoveryCodes[6]}</li>
																	<li>{recoveryCodes[7]}</li>
																</div>
															</>
														}
													</div>
												</div>
											</div>
										</div>
									}
									{
										isEnabling &&
										<div className="mb-3 row">
											<label className="col-sm-2 col-form-label">One Step More</label>
											<div className="col-sm-10">
												<div className='card p-4'>
													<p className='mb-4'>
														To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code.
													</p>
													<div className='d-flex justify-content-start'>
														<div dangerouslySetInnerHTML={{__html: responseEnable2Fa.svg || ''}}></div>
														<div className='my-auto'>
															<p className='fw-bold ms-5'>Setup Key : {responseEnable2Fa.secretKey}</p>
														</div>
													</div>
													<MDBInput value={confirmCode2Fa.code} onChange={(e) => setConfirmCode2Fa({code: e.target.value})} wrapperClass='mt-5 mb-3 w-50' label='Code' id='code' name='code' />
													<div className='d-flex'>
														<MDBBtn onClick={() => handleClickConfirm2Fa()} className="mb-4 me-2">Confirm</MDBBtn>
														<MDBBtn onClick={() => handleCancel2Fa()} color='secondary' className="mb-4">Cancel</MDBBtn>
													</div>
												</div>
											</div>
										</div>
									}
									<div className="mb-3 row">
										{
											!isEnabling && <label className="col-sm-2 col-form-label">Action</label>
										}
										<div className="col-sm-10">
											{
												isEnable2Fa &&
												<>
													{
														!showRecoveryCodes &&
														<MDBBtn color='secondary' className='me-3' onClick={() => handleClickShowRecoveryCodes()}>
															Show Recovery Codes
														</MDBBtn>
													}
													{
														showRecoveryCodes &&
														<MDBBtn color='secondary' className='me-3' onClick={() => handleClickRegenerateRecoveryCodes()}>
															Regenerate Recovery Codes
														</MDBBtn>
													}
													<MDBBtn color='danger' className='me-3' onClick={() => handleClickDisable2Fa()}>
														Disable
													</MDBBtn>
												</>
											}
											{
												!isEnable2Fa && !isEnabling &&
												<MDBBtn color='success' className='me-3' onClick={() => handleClickEnable2Fa()}>
													Enable
												</MDBBtn>
											}
										</div>
									</div>
								</div>
							</div >
						</div >
					</div >
				</>
			}
		</>
	)
}
