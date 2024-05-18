import axios from 'axios';
import baseUrl from '../../utils/baseUrl'

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