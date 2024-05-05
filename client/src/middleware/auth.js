import {useEffect} from 'react'
import axios from '../lib/axios'
import api from '../configs/api'
import {useNavigate} from 'react-router-dom'

export default function Auth({children}) {
	const navigate = useNavigate()
	useEffect(() => {
		axios(api.apiMe).then((res) => {
			console.log(res)
		}).catch(err => {
			if(err.response.status != 200) {
				window.location = '/login'
			}
		})
	}, [])

	return (
		children
	)
}
