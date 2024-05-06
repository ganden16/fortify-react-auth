import React, {useState} from 'react';
import {
	MDBContainer,
	MDBTabsContent,
	MDBBtn,
	MDBInput,
} from 'mdb-react-ui-kit';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../configs/api';
import axios from '../lib/axios';
import {PropagateLoader} from 'react-spinners';

function App() {
	const initialForm = {
		name: "",
		email: "",
		gender: "",
		password: "password",
		password_confirmation: "password"
	}
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickRegister = async () => {
		try {
			setIsLoading(true)
			let response = await axios.post(api.apiRegister, {
				name: form.name,
				email: form.email,
				gender: form.gender,
				password: form.password,
				password_confirmation: form.password_confirmation
			})
			if(response.status == 201) {
				setIsLoading(false)
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Registrasi Sukses',
					showConfirmButton: false,
					timer: 2000
				})
				setTimeout(() => {
					window.location = '/'
				}, 2500)
			}
		} catch(error) {
			setIsLoading(false)
			console.log(error)
			if(error.response.status == 422) {
				setErrors(error.response.data.errors)
				Swal.fire({
					icon: 'error',
					title: 'Terjadi Kesalahan Input',
					text: 'masukkan inputan dengan benar',
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

			<MDBTabsContent>
				<div className="text-center mb-3">
					<h3 className="text-center mt-3">Register</h3>
				</div>

				<div className='mb-3 pb-0'>
					<MDBInput onChange={handleChange} value={form.name} label='Name' id='name' name='name' type='text' />
					{
						errors.name &&
						errors.name.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
					}
				</div>
				<div className='mb-3 pb-0'>
					<MDBInput onChange={handleChange} value={form.email} label='Email' id='email' name='email' type='email' />
					{
						errors.email &&
						errors.email.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
					}
				</div>

				<div className='mb-3 pb-0'>
					<select onChange={handleChange} value={form.gender} className="form-select" id='gender' name='gender' >
						<option value={""}>Select Gender</option>
						<option value="0">Male</option>
						<option value="1">Female</option>
					</select>
					{
						errors.gender &&
						errors.gender.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
					}
				</div>

				<div className='mb-3 pb-0'>
					<MDBInput onChange={handleChange} value={form.password} label='Password' id='password' name='password' type='password' />
					{
						errors.password &&
						errors.password.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
					}
				</div>

				<div className='mb-3 pb-3'>
					<MDBInput onChange={handleChange} value={form.password_confirmation} label='Password Confirmation' id='password_confirmation' name='password_confirmation' type='password' />
				</div>

				{
					!isLoading && <MDBBtn onClick={handleClickRegister} className="mb-4 w-100">Sign up</MDBBtn>
				}
				{
					isLoading && <div className='d-flex justify-content-center'><PropagateLoader color="#36d7b7" speedMultiplier={3} /></div>
				}

				<div className="text-center">
					<p>Have account? <Link to={"/login"}>Login</Link></p>
				</div>
			</MDBTabsContent>
		</MDBContainer >
	);
}

export default App;