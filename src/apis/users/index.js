import axios from 'axios';
import baseUrl from '../../utils/baseUrl'

export const loginUser = async (username, password) => {
    const response = await axios.post(`${baseUrl}/users/login`, { username, password });
    return response.data;
}