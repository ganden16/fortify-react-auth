import axios, {getCSRFCookie} from '../lib/axios'
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from "../configs/api"
import Swal from 'sweetalert2'

export default function Navbar() {
	const logout = () => {
		Swal.fire({
			title: 'Logout?',
			text: "Anda akan keluar dan tidak memiliki akses aplikasi",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya',
			cancelButtonText: 'Tidak'
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const res = await axios.post(api.apiLogout)
					if(res.status == 204) {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Anda Telah Logout',
							showConfirmButton: false,
							timer: 1500
						})
						setTimeout(() => {
							window.location = '/login'
						}, 2000)
					}
				} catch(error) {
					console.log(error)
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'terjadi kesalahan',
					})
				}
			}
		})
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary ">
				<div className="container-fluid">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarSupportedContent">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/"}>Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/product"}>Product</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/category"}>Category</Link>
							</li>
						</ul>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link fw-bold fs-5 me-3" aria-current="page" to={"/profile"}>My Profile</Link>
							</li>
							<li className="nav-item">
								<a className="nav-link fw-bold fs-5 me-3" href='#' onClick={logout}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
