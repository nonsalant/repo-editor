import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const getUser = async (accessToken) => {
    const res = await axios.get(`${GITHUB_API_URL}/user`, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    return res.data;
}

const validateToken = async (accessToken) => {
    try {
        const user = await getUser(accessToken);
        if (user) {
            return true;
        }
    } catch (err) {
        console.error(err);
    }
    return false;
}

export {
    validateToken
}

////

export const authenticate = async (accessToken) => {
    try {
        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Token ${accessToken}`
            }
        });
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};
