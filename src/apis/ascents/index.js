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