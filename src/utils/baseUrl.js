let baseUrl;

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5000/climbinglog/api';
} else {
    baseUrl = process.env.REACT_APP_BASE_URL + '/climbinglog/api';
}

export default baseUrl;