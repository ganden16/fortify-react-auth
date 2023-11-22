import React, {useState} from 'react';
import {
	MDBContainer,
	MDBInput,
	MDBBtn,
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom';
import axios from '../lib/axios';
import api from '../configs/api';
import Swal from 'sweetalert2';
import {MoonLoader} from 'react-spinners';

function TwoFactorChallengeRecoveryCode({setUseAnAuthenticationCode, setIsSuccessLogin}) {
	const [form, setForm] = useState({
		recovery_code: ''
	})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickConfirm = async () => {
		try {
			setIsLoading(true)
			const response = await axios.post(api.api2FaChallenge, form)
			if(response.status == 204) {
				setIsLoading(false)
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: '2Fa challenge confirmed',
					showConfirmButton: false,
					timer: 3000
				})
				setIsSuccessLogin(true)
				window.location.reload();
			}
		} catch(error) {
			setIsLoading(false)
			if(error.response.status == 422) {
				Swal.fire({
					icon: 'error',
					title: 'Invalid recovery code',
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

	return (
		<>
			<div className='card'>
				<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
					<div className="text-center mb-3">
						<h3 className="text-center mt-3">2FA Challenge Recovery Code</h3>
					</div>
					<p>Please confirm access to your account by entering one of your emergency recovery codes.</p>
					<MDBInput onChange={handleChange} value={form.recovery_code} wrapperClass='mb-4' label='Recovery Code' id='recovery_code' name='recovery_code' />
					<div className='d-flex justify-content-between'>
						<Link to={'#'} onClick={() => setUseAnAuthenticationCode(true)} className='me-3 text-decoration-underline text-primary'>Use an authentication code</Link>
						{
							!isLoading && <MDBBtn onClick={handleClickConfirm} className="mb-4 w-50">Confirm</MDBBtn>
						}
						{
							isLoading &&
							<MoonLoader
								size={45}
								color="#36ced6"
								speedMultiplier={2}
							/>
						}
					</div>
				</MDBContainer>
			</div>
		</>
	);
}

export default TwoFactorChallengeRecoveryCode;
