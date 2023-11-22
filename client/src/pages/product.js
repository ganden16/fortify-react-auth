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
import DetailProduct from '../components/detailProduct';

export default function Product() {
	const initialForm = {
		name: "",
		description: "",
		price: "",
		category_id: "",
	}

	const [detailModal, setDetailModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [formAdd, setFormAdd] = useState(initialForm)
	const [formEdit, setFormEdit] = useState(initialForm)
	const [findProduct, setFindProduct] = useState({})
	const [errorsAdd, setErrorsAdd] = useState({})
	const [errorsEdit, setErrorsEdit] = useState({})

	const openEditModal = async (id) => {
		await axios.get(`${api.apiProduct}/${id}`).then(res => {
			if(res.status == 200) {
				setFormEdit(res.data.data)
			}
		})
		setEditModal(true)
	}

	const openDetailModal = async (id) => {
		await axios.get(`${api.apiProduct}/${id}`).then(res => {
			if(res.status == 200) {
				setFindProduct(res.data.data)
			}
		})
		setDetailModal(true)
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

	const handleClickDelete = (id, name) => {
		Swal.fire({
			title: 'Are you sure to delete this product?',
			text: `product name = ${name}, product id = ${id}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const res = await axios.delete(`${api.apiProduct}/${id}`)
					if(res.status = 200) {
						Swal.fire(
							'Deleted!',
							'Product has been deleted.',
							'success'
						)
						getProducts()
					}
				} catch(error) {
					console.log(error)
					if(error.response.status == 403) {
						Swal.fire({
							icon: 'error',
							title: 'Forbidden access',
							text: error.response.data.message,
						})
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Error ' + error.response.status,
						})
					}
				}
			}
		})
	}

	const handleClickSaveAddModal = () => {
		Swal.fire({
			title: 'Do you want to save the new product?',
			showCancelButton: true,
			confirmButtonText: 'Save',
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const res = await axios.post(api.apiProduct, {
						name: formAdd.name,
						description: formAdd.description,
						price: formAdd.price,
						category_id: formAdd.category_id,
					})
					if(res.status == 201) {
						Swal.fire('Saved!', '', 'success')
						setAddModal(false)
						getProducts()
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
			title: 'Do you want to update this product?',
			showCancelButton: true,
			confirmButtonText: 'Update',
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const res = await axios.put(`${api.apiProduct}/${id}`, {
						name: formEdit.name,
						description: formEdit.description,
						price: formEdit.price,
						category_id: formEdit.category_id,
					})
					if(res.status == 200) {
						Swal.fire('Updated!', '', 'success')
						getProducts()
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
	const getProducts = () => {
		axios(api.apiProduct).then(res => {
			setProducts(res.data.data)
		})
	}

	const getCategories = () => {
		axios(api.apiCategory).then(res => {
			setCategories(res.data.data)
		})
	}

	useEffect(() => {
		getProducts()
		getCategories()
	}, [])

	useEffect(() => {
		!addModal && setErrorsAdd({})
		!editModal && setErrorsEdit({})
	}, [addModal, editModal])

	return (
		<>
			<Navbar />
			<h3 className='text-center mt-3'>Data Products</h3>
			<MDBBtn color='success' size='lg' className='m-3' onClick={() => setAddModal(!addModal)} >
				Add Product
			</MDBBtn>

			<DetailProduct detailModal={detailModal} setDetailModal={setDetailModal} data={findProduct} />

			<MDBModal show={addModal} setShow={setAddModal} tabIndex='-1'>
				<MDBModalDialog scrollable>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Add New Product</MDBModalTitle>
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
								<div className="mb-3">
									<label htmlFor="price" className="form-label">Price</label>
									<input onChange={handleChangeFormAdd} value={formAdd.price} type='number' className="form-control" id="price" name='price' />
									{
										errorsAdd.price &&
										errorsAdd.price.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<textarea onChange={handleChangeFormAdd} value={formAdd.description} className="form-control" id="description" name="description" rows="3"></textarea>
									{
										errorsAdd.description &&
										errorsAdd.description.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
								<div className="mb-3">
									<label htmlFor="category_id" className="form-label">Category</label>
									<select onChange={handleChangeFormAdd} value={formAdd.category_id} className="form-select" id='category_id' name='category_id' aria-label="Default select example">
										<option value={""}>Select Category</option>
										{
											categories.length > 0 &&
											categories.map(category => <option value={category.id}>{category.name}</option>)
										}
									</select>
									{
										errorsAdd.category_id &&
										errorsAdd.category_id.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
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
							<MDBModalTitle>Edit Product</MDBModalTitle>
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
								<div className="mb-3">
									<label htmlFor="price" className="form-label">Price</label>
									<input onChange={handleChangeFormEdit} value={formEdit.price} type='number' className="form-control" id="price" name='price' />
									{
										errorsEdit.price &&
										errorsEdit.price.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<textarea onChange={handleChangeFormEdit} value={formEdit.description} className="form-control" id="description" name="description" rows="3"></textarea>
									{
										errorsEdit.description &&
										errorsEdit.description.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
									}
								</div>
								<div className="mb-3">
									<label htmlFor="category_id" className="form-label">Category</label>
									<select onChange={handleChangeFormEdit} value={formEdit.category_id} className="form-select" id='category_id' name='category_id' aria-label="Default select example">
										<option value={""}>Select Category</option>
										{
											categories.length > 0 &&
											categories.map(category => <option value={category.id}>{category.name}</option>)
										}
									</select>
									{
										errorsEdit.category_id &&
										errorsEdit.category_id.map(err => <span className='text-danger mb-0 pb-0 me-3'>{err}</span>)
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
						<th scope='col'>No</th>
						<th scope='col'>Name</th>
						<th scope='col'>Description</th>
						<th scope='col'>Price</th>
						<th scope='col'></th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{
						products.length > 0 &&
						products.map((product, i) =>
							<tr key={product.id}>
								<td>
									<p className='fw-bold mb-1'>{i + 1}</p>
								</td>
								<td>
									<p className='fw-bold mb-1'>{product.name}</p>
								</td>
								<td>
									<p className='fw-normal mb-1'>{product.description}</p>
								</td>
								<td>
									<p className='fw-normal mb-1'>Rp{product.price}</p>
								</td>
								<td>
									<div className='d-flex flex-column'>
										<MDBBtn color='success' rounded size='sm' className='me-1 mb-1' onClick={() => openDetailModal(product.id)} >
											Detail
										</MDBBtn>
										<MDBBtn color='warning' rounded size='sm' className='me-1 mb-1' onClick={() => openEditModal(product.id)} >
											Edit
										</MDBBtn>
										<MDBBtn color='danger' rounded size='sm' className='me-1' onClick={() => handleClickDelete(product.id, product.name)} >
											Delete
										</MDBBtn>
									</div>
								</td>
							</tr>
						)
					}
				</MDBTableBody>
			</MDBTable>
		</>
	);
}