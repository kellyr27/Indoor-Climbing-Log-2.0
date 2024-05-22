import axios from 'axios';
import baseUrl from '../../utils/baseUrl'

export const getAscent = async (id) => {    
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/ascents/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAscent = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${baseUrl}/ascents/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getAscents = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/ascents`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createAscent = async (ascent) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.post(`${baseUrl}/ascents`, ascent, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const editAscent = async (id, ascent) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.put(`${baseUrl}/ascents/${id}`, ascent, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}