import {MDBInput} from 'mdb-react-ui-kit'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react'
import api from '../configs/api';
import axios from '../lib/axios';
import Swal from 'sweetalert2';

export default function ConfirmPassword({setIsConfirmPassword}) {
	const [show, setShow] = useState(true);
	const handleClose = () => {
		setShow(false)
		setIsConfirmPassword(false)
	};
	const [form, setForm] = useState({
		password: ''
	})
	const handleClickConfirm = async () => {
		try {
			const response = await axios.post(api.apiConfirmPassword, form)
			if(response.status == 201) {
				setShow(false)
			}
		} catch(error) {
			console.log(error)
			if(error.response.status == 422) {
				Swal.fire({
					icon: 'error',
					title: 'Password salah',
					text: 'Coba lagi',
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
		<>
			<Modal centered={true} show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<span>For your security, please confirm your password to continue.</span>
					<MDBInput value={form.password} onChange={(e) => setForm({password: e.target.value})} wrapperClass='mt-3' label='Confirm Password' id='password' name='password' type='password' />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClickConfirm}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
