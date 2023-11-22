import React, {useEffect, useState} from 'react';
import {
	MDBContainer,
	MDBInput,
	MDBBtn,
} from 'mdb-react-ui-kit';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import api from "../configs/api"
import axios, {getCSRFCookie} from '../lib/axios';
import Swal from 'sweetalert2';
import {MoonLoader} from 'react-spinners';

function ResetPassword() {
	const navigate = useNavigate()
	const [isSuccessResetPassword, setIsSuccessResetPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState({})
	let {token} = useParams()
	let [searchParams, setSearchParams] = useSearchParams();

	const [form, setForm] = useState({
		email: searchParams.get('email'),
		password: '',
		password_confirmation: '',
		token
	})

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickResetPassword = async () => {
		try {
			setIsLoading(true)
			await getCSRFCookie()
			const response = await axios.post(api.apiResetPassword, form)
			if(response.status == 200) {
				setIsLoading(false)
				setIsSuccessResetPassword(true)
				setErrors({})
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: response.data.message,
					showConfirmButton: false,
					timer: 1000
				})
				setTimeout(() => {
					navigate('/login')
				}, 3000)
			}
		} catch(error) {
			setIsLoading(false)
			console.log(error)
			if(error.response.status == 422) {
				setErrors(error.response.data.errors)
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
						<h3 className="text-center mt-3">Reset Password</h3>
					</div>
					<div className='mb-4'>
						<MDBInput onChange={handleChange} value={form.email} label='Email' id='email' name='email' type='email' disabled />
						{
							errors.email &&
							errors.email.map(err => <li className='text-danger mb-0 pb-0 me-3'>{err}</li>)
						}
					</div>
					<div className='mb-4'>
						<MDBInput onChange={handleChange} value={form.password} label='New Password' id='password' name='password' type='password' />
						{
							errors.password &&
							errors.password.map(err => <li className='text-danger mb-0 pb-0 me-3'>{err}</li>)
						}
					</div>
					<div className="mb-4">
						<MDBInput onChange={handleChange} value={form.password_confirmation} label='Confirm Password' id='password_confirmation' name='password_confirmation' type='password' />
					</div>
					{
						isSuccessResetPassword &&
						<div className="font-medium text-sm text-success">redirect login page in 3s...</div>
					}
					{
						!isLoading && !isSuccessResetPassword &&
						<MDBBtn onClick={handleClickResetPassword} className="mb-4 w-50 me-auto">Reset Password</MDBBtn>
					}
					{
						isLoading &&
						<MoonLoader
							size={45}
							color="#36ced6"
							speedMultiplier={2}
						/>
					}
				</MDBContainer>
			</div>
		</>
	);
}

export default ResetPassword;
