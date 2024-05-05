import React, {useEffect, useState} from 'react'
import Navbar from '../components/navbar'
import axios from '../lib/axios';
import api from '../configs/api'
import {RiseLoader} from 'react-spinners';
import {useSearchParams} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Index() {
	const [me, setMe] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		axios(api.apiMe).then(res => {
			setIsLoading(false)
			setMe(res.data.user)
		})
		if(searchParams.get('verified') == 1) {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Email has been verified successfuly',
				showConfirmButton: false,
				timer: 2000
			})
			setSearchParams('')
		}
	}, [])

	return (
		<>
			<Navbar />
			{
				isLoading &&
				<div className="d-flex justify-content-center mt-3">
					Loading...<RiseLoader size={7} color="#239ada" />
				</div>
			}
			{
				!isLoading &&
				<div className='d-flex justify-content-center'>
					<div className="alert alert-success  w-75" role="alert">
						{me.role_id == 1 && <h4 className="alert-heading">Welcome Admin</h4>}
						{me.role_id == 2 && <h4 className="alert-heading">Welcome User</h4>}
						<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi atque magnam culpa tempore voluptatem? At sit magnam voluptatum illo perferendis. Labore odio iure corrupti aliquam molestiae non cum eos commodi!</p>
						<hr />
						{me.role_id == 1 && <p className="mb-0">You have access to all functions</p>}
						{me.role_id == 2 && <p className="mb-0">you can only perform limited functions</p>}
					</div>
				</div>
			}
		</>
	)
}
