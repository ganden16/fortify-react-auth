import {useEffect} from 'react'
import api from '../configs/api'
import axios from '../lib/axios'
import {useNavigate} from 'react-router-dom'

export default function Guest({children}) {
	const navigate = useNavigate()

	useEffect(() => {
		axios(api.apiMe).then((res) => {
			console.log(res)
			if(res.status == 200) {
				window.location = '/'
			}
		}).catch(err => {
			if(err.response.status == 401){
				console.log('unauthenticate')
			}
		})
	}, [])

	return (
		children
	)
}
