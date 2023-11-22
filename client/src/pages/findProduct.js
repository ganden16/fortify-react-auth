import React, {useEffect, useState} from 'react'
import formatTime from '../utils/formatTime'
import {capitalize} from 'lodash'
import {useParams} from 'react-router-dom'
import axios from '../lib/axios'
import api from '../configs/api'
import Swal from 'sweetalert2'
import {RiseLoader} from 'react-spinners'
import Navbar from '../components/navbar'

export default function FindProduct() {
	const [product, setProduct] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	let {id} = useParams()

	const getOneProduct = (id) => {
		axios(`${api.apiProduct}/${id}`).then(res => {
			setIsLoading(false)
			setProduct(res.data.data)
		}).catch(err => {
			setIsLoading(false)
			if(err.response.status != 404) {
				Swal.fire({
					icon: 'error',
					title: 'Error ' + err.response.status,
				})
			}
		})
	}

	useEffect(() => {
		getOneProduct(id)
	}, [id])

	return (
		<>
			<Navbar />
			{
				isLoading &&
				<div className="d-flex justify-content-center mt-5">
					Loading...<RiseLoader size={10} color="#239ada" />
				</div>
			}
			{
				!isLoading && product &&
				<div className='py-3  d-flex justify-content-center'>
					<div className="card w-75">
						<div className="card-body">
							<div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Name</label>
									<div className="col-sm-10">
										<p className=''>{capitalize(product?.name)}</p>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Description</label>
									<div className="col-sm-10">
										<p className=''>{capitalize(product?.description)}</p>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Price</label>
									<div className="col-sm-10">
										<p className=''>Rp{product?.price}</p>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Category</label>
									<div className="col-sm-10">
										<p className=''>{capitalize(product?.category?.name)}</p>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Created By</label>
									<div className="col-sm-10">
										<p className=''>{capitalize(product?.author?.name)}</p>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Updated By</label>
									<div className="col-sm-10">
										<p className=''>{capitalize(product?.editor?.name) || '-----'}</p>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Created at</label>
									<div className="col-sm-10">
										<p className=''>{formatTime(product?.created_at)}</p>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-2 col-form-label">Updated at</label>
									<div className="col-sm-10">
										<p className=''>{formatTime(product?.updated_at)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			}

			{
				!isLoading && !product &&
				<div className="text-center mt-5">
					<h1>Product Not Found...</h1>
				</div>
			}
		</>
	)
}
