import axios from 'axios';
import baseUrl from '../../../utils/baseUrl'

export const getAreas = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/areas`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editArea = async (areaId, areaData) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.put(`${baseUrl}/areas/${areaId}`, areaData, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const getArea = async (areaId) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.get(`${baseUrl}/areas/${areaId}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}