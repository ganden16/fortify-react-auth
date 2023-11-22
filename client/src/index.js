import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

// axios.defaults.withCredentials = true
// axios.interceptors.request.use((config) => {
// 	config.withCredentials = true
// 	return config
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
