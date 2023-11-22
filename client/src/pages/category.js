import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import {
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody,
	MDBModalFooter,
} from 'mdb-react-ui-kit'

import Swal from 'sweetalert2'
import Navbar from '../components/navbar';
import axios from '../lib/axios';
import api from '../configs/api';
import formatTime from '../utils/formatTime';

export default function Category() {
	const initialForm = {
		name: "",
	}
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [categories, setCategories] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [formAdd, setFormAdd] = useState(initialForm)
	const [formEdit, setFormEdit] = useState(initialForm)
	const [errorsAdd, setErrorsAdd] = useState({})
	const [errorsEdit, setErrorsEdit] = useState({})

	const openEditModal = async (id) => {
		axios.get(`${api.apiCategory}/${id}`).then(res => {
			if(res.status == 200) {
				setFormEdit(res.data.data)
			}
		})
		setEditModal(true)
	}

	const handleChangeFormAdd = (e) => {
		setFormAdd({
			...formAdd,
			[e.target.name]: e.target.value,
		})
	}

	const handleChangeFormEdit = (e) => {
		setFormEdit({
			...formEdit,
			[e.target.name]: e.target.value,
		})
	}

	const handleClickSaveAddModal = () => {
		Swal.fire({
			title: 'Do you want to save the new category?',
			showCancelButton: true,
			confirmButtonText: 'Save',
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const res = await axios.post(api.apiCategory, {
						name: formAdd.name,
					})
					if(res.status == 201) {
						Swal.fire('Saved!', '', 'success')
						setAddModal(false)
						getCategories()
						setFormAdd(initialForm)
					}
				} catch(error) {
					console.log(error)
					setAddModal(false)
					if(error.response.status == 403) {
						Swal.fire({
							icon: 'error',
							title: 'Forbidden Access',
							text: error.response.data.message,
						})
					} else if(error.response.status == 422) {
						setErrorsAdd(error.response.data.errors)
						Swal.fire({
							icon: 'error',
							title: 'Terjadi Kesalahan Input',
							text: 'Masukkan inputan dengan benar',
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
		})
	}

	const handleClickSaveEditModal = (id) => {
		Swal.fire({
			title: 'Do you want to update this category?',
			showCancelButton: true,
			confirmButtonText: 'Update',
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const res = await axios.put(`${api.apiCategory}/${id}`, {
						name: formEdit.name,
					})
					if(res.status == 200) {
						Swal.fire('Updated!', '', 'success')
						getCategories()
						setEditModal(false)
						setFormEdit(initialForm)
					}
				} catch(error) {
					console.log(error)
					setEditModal(false)
					if(error.response.status == 403) {
						Swal.fire({
							icon: 'error',
							title: 'Forbidden Access',
							text: error.response.data.message,
						})
					} else if(error.response.status == 422) {
						setErrorsEdit(error.response.data.errors)
						Swal.fire({
							icon: 'error',
							title: 'Terjadi Kesalahan Input',
							text: 'Masukkan inputan dengan benar',
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
		})
	}

	const handleClickDelete = (id, name) => {
		Swal.fire({
			title: 'Are you sure to delete this category?',
			text: `category name = ${name}, category id = ${id}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const res = await axios.delete(`${api.apiCategory}/${id}`)
					if(res.status = 200) {
						Swal.fire(
							'Deleted!',
							'category has been deleted.',
							'success'
						)
						getCategories()
					}
				} catch(error) {
					console.log(error)
					if(error.response.status == 403) {
						Swal.fire({
							icon: 'error',
							title: 'Forbidden Access',
							text: error.response.data.message,
						})
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Error ' + error.response.status,
							text: 'Try again!'
						})
					}
				}
			}
		})
	}

	const getCategories = () => {
		axios(api.apiCategory).then(res => {
			setCategories(res.data.data)
		})
	}

	useEffect(() => {
		getCategories()
	}, [])

	useEffect(() => {
		!addModal && setErrorsAdd({})
		!editModal && setErrorsEdit({})
	}, [addModal, editModal])

	return (
		<>
			<Navbar />
			<h3 className='text-center mt-3'>Data Categories</h3>
			<MDBBtn color='success' size='lg' className='m-3' onClick={() => setAddModal(!addModal)} >
				Add Category
			</MDBBtn>

			<MDBModal show={addModal} setShow={setAddModal} tabIndex='-1'>
				<MDBModalDialog scrollable>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Add New Category</MDBModalTitle>
							<MDBBtn
								className='btn-close'
								color='none'
								onClick={() => setAddModal(!addModal)}
							></MDBBtn>
						</MDBModalHeader>
						<MDBModalBody>
							<form>
								<div className="mb-3">
									<label htmlFor="name" className="form-label">Name</label>
									<input onChange={handleChangeFormAdd} value={formAdd.name} className="form-control" id="name" name='name' />
									{
										errorsAdd.name &&
										errorsAdd.name.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
							</form>

						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={() => setAddModal(!addModal)}>
								Close
							</MDBBtn>
							<MDBBtn onClick={() => handleClickSaveAddModal()}>Save</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>

			<MDBModal show={editModal} setShow={setEditModal} tabIndex='-1'>
				<MDBModalDialog scrollable>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Edit Category</MDBModalTitle>
							<MDBBtn
								className='btn-close'
								color='none'
								onClick={() => setEditModal(!editModal)}
							></MDBBtn>
						</MDBModalHeader>
						<MDBModalBody>
							<form>
								<div className="mb-3">
									<label htmlFor="name" className="form-label">Name</label>
									<input onChange={handleChangeFormEdit} value={formEdit.name} className="form-control" id="name" name='name' />
									{
										errorsEdit.name &&
										errorsEdit.name.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
							</form>

						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={() => setEditModal(!editModal)}>
								Close
							</MDBBtn>
							<MDBBtn onClick={() => handleClickSaveEditModal(formEdit.id)}>Update</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>

			<MDBTable align='middle'>
				<MDBTableHead>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>Created</th>
						<th scope='col'>Updated</th>
						<th scope='col'></th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{
						categories.length > 0 &&
						categories.map(category =>
							<tr>
								<td>
									<p className='fw-bold mb-1'>{category.name}</p>
								</td>
								<td>
									<p className='fw-bold mb-1'>{formatTime(category.created_at)}</p>
								</td>
								<td>
									<p className='fw-bold mb-1'>{formatTime(category.updated_at)}</p>
								</td>
								<td>
									<MDBBtn color='warning' rounded size='sm' className='me-1' onClick={() => openEditModal(category.id)} >
										Edit
									</MDBBtn>
									<MDBBtn color='danger' rounded size='sm' className='me-1' onClick={() => handleClickDelete(category.id, category.name)} >
										Delete
									</MDBBtn>
								</td>
							</tr>
						)
					}
				</MDBTableBody>
			</MDBTable>
		</>
	);
}