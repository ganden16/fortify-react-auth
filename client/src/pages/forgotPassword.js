import React, {useState} from 'react';
import {
	MDBContainer,
	MDBInput,
	MDBBtn,
} from 'mdb-react-ui-kit';
import api from "../configs/api"
import axios, {getCSRFCookie} from '../lib/axios';
import Swal from 'sweetalert2';
import {MoonLoader} from 'react-spinners';

function ForgotPassword() {
	const [isSuccessSendLinkEmail, setIsSuccessSendLinkEmail] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [form, setForm] = useState({
		email: ''
	})

	const handleClickSendLink = async () => {
		try {
			setIsLoading(true)
			await getCSRFCookie()
			const response = await axios.post(api.apiForgotPassword, {
				email: form.email
			})
			if(response.status == 200) {
				setIsLoading(false)
				setIsSuccessSendLinkEmail(true)
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Email has been Sent',
					showConfirmButton: false,
					timer: 1500
				})
			}
		} catch(error) {
			setIsLoading(false)
			console.log(error)
			if(error.response.status == 422) {
				setErrors(error.response.data.errors)
				setIsSuccessSendLinkEmail(false)
			}
			Swal.fire({
				icon: 'error',
				title: 'error ' + error.response.status,
				text: 'Coba lagi',
			})
		}
	}
	return (
		<>
			<div className='card'>
				<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
					<div className="text-center mb-3">
						<h3 className="text-center mt-3">Forgot Password</h3>
					</div>
					<p>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>
					<MDBInput onChange={(e) => setForm({email: e.target.value})} value={form.email} wrapperClass='' label='Email' id='email' name='email' type='email' />
					{
						errors.email &&
						errors.email.map(err => <span className='text-danger pb-0 me-3'>{err}</span>)
					}
					{
						!isLoading && isSuccessSendLinkEmail &&
						<>
							<div className='d-flex justify-content-between mt-3'>
								<MDBBtn onClick={handleClickSendLink} className="mb-4">Resend Link</MDBBtn>
								<div className="font-medium text-sm text-success">A new reset password link has been sent to your email address.</div>
							</div>
						</>
					}
					{
						!isLoading && !isSuccessSendLinkEmail &&
						<MDBBtn onClick={handleClickSendLink} className="mt-4 me-auto">Send Reset Link</MDBBtn>
					}
					{
						isLoading &&
						<div className='mt-2'>
							<MoonLoader
								size={45}
								color="#36ced6"
								speedMultiplier={2}
							/>
						</div>
					}
				</MDBContainer>
			</div>
		</>
	);
}

export default ForgotPassword;
