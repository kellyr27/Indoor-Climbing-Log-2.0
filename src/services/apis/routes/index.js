import axios from 'axios';
import baseUrl from '../../../utils/baseUrl'

export const getRoutes = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/routes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getRoute = async (id) => {    
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/routes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editRoute = async (id, editedRoute) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.put(`${baseUrl}/routes/${id}`, editedRoute, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}