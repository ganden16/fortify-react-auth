import Axios from "axios";
import Cookies from 'js-cookie';

const axios = Axios.create({
	baseURL: "http://localhost:8000",
	// baseURL: "https://api-fortify-react-auth.faycook.my.id",
	timeout: 10000,
	headers: {
		Accept: 'application/json',
		'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
		'X-Requested-With': 'XMLHttpRequest',
	},
	withCredentials: true,
})

// axios.interceptors.response.use(function(response) {
// 	return response;
// }, function(error) {
// 	if(401 === error.response.status) {
// 		window.location = '/login'
// 	} else {
// 		return Promise.reject(error);
// 	}
// });

export const getCSRFCookie = async () => {
	await axios.get('/sanctum/csrf-cookie');
};

export default axios