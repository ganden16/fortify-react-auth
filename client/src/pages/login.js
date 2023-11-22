import React, {useState} from 'react';
import {
	MDBContainer,
	MDBInput,
	MDBBtn,
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom';
import api from "../configs/api"
import axios, {getCSRFCookie} from '../lib/axios';
import Swal from 'sweetalert2';
import {PropagateLoader} from 'react-spinners'

function Login() {
	const initialForm = {
		email: "",
		password: "password",
	}
	const [form, setForm] = useState(initialForm)
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickLogin = async () => {
		try {
			setIsLoading(true)
			await getCSRFCookie()
			let response = await axios.post(api.apiLogin, {
				email: form.email,
				password: form.password
			})
			if(response.status == 200) {
				setIsLoading(false)
				if(!response.data.two_factor) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Login Sukses',
						showConfirmButton: false,
						timer: 1500
					})
					setTimeout(() => {
						window.location = '/'
					}, 2000)
				} else {
					window.location = '/2fa-challenge'
				}
			}
		} catch(error) {
			setIsLoading(false)
			console.log(error)
			if(error.response.status == 422) {
				Swal.fire({
					icon: 'error',
					title: 'Username atau password salah',
					text: 'coba lagi',
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error ' + error.response.status,
					text: 'Coba lagi',
				})
			}
		}
	}

	return (
		<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
			<div className="text-center mb-3">
				<h3 className="text-center mt-3">Login</h3>
			</div>
			<MDBInput onChange={handleChange} value={form.email} wrapperClass='mb-4' label='Email' id='email' name='email' type='email' />
			<MDBInput onChange={handleChange} value={form.password} wrapperClass='mb-4' label='Password' id='password' name='password' type='password' />

			{
				!isLoading && <MDBBtn onClick={handleClickLogin} className="mb-4">Sign in</MDBBtn>
			}
			{
				isLoading && <div className='d-flex justify-content-center'><PropagateLoader color="#36d7b7" speedMultiplier={3} /></div>
			}

			<div className="d-flex justify-content-between">
				<p>Forgot password? <Link className='text-decoration-underline' to={"/forgot-password"}>Click here</Link></p>
				<p>Not a member? <Link className='text-decoration-underline' to={"/register"}>Register</Link></p>
			</div>

		</MDBContainer>
	);
}

export default Login;