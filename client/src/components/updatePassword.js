import {MDBBtn} from 'mdb-react-ui-kit'
import React, {useState} from 'react'
import api from '../configs/api'
import axios from '../lib/axios'
import Swal from 'sweetalert2'

export default function UpdatePassword() {
	const initialForm = {
		current_password: '',
		password: '',
		password_confirmation: '',
	}
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState({})

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickSave = async () => {
		Swal.fire({
			title: 'Update Password',
			text: "Save password changes??",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Cancel'
		}).then(async (res) => {
			if(res.isConfirmed) {
				try {
					const response = await axios.put(api.apiUpdatePassword, form)
					if(response.status == 200) {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Password has been updated',
							showConfirmButton: false,
							timer: 1500
						})
						setForm(initialForm)
						setErrors({})
					}
				} catch(error) {
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
		})
	}

	return (
		<>
			<div className='py-3 d-flex justify-content-center'>
				<div className="card w-75">
					<div className="card-body">
						<div>
							<h3 className='text-center mb-4'>Update Password</h3>
							<div className="mb-3 row">
								<label htmlFor="current_password" className="col-sm-2 col-form-label">Current Password</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.current_password} className="form-control" name='current_password' id="current_password" type='password' />
									{
										errors.current_password &&
										errors.current_password.map(err => <li className='text-danger mb-0 pb-0 me-3'>{err}</li>)
									}
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="password" className="col-sm-2 col-form-label">New Password</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.password} className="form-control" id="password" name='password' type='password' />
									{
										errors.password &&
										errors.password.map(err => <li className='text-danger mb-0 pb-0 me-3'>{err}</li>)
									}
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="password_confirmation" className="col-sm-2 col-form-label">Confirm Password</label>
								<div className="col-sm-10">
									<input onChange={handleChange} value={form.password_confirmation} className="form-control" id="password_confirmation" name='password_confirmation' type='password' />
								</div>
							</div>
							<div className='mt-5 d-flex justify-content-end'>
								<MDBBtn onClick={handleClickSave}>Save</MDBBtn>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
