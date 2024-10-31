import { REACT_NATIVE_API_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: REACT_NATIVE_API_URL,
});
export const login = async (username: string, password: string) => {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 5000)
    );

    try {
        const response = await Promise.race([
            api.post('/auth/login', { username, password }),
            timeoutPromise,
        ]);
        return (response as AxiosResponse<any>).data;
    } catch (error) {
        console.log(error);

        throw new Error('Login failed');
    }
};

export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        throw new Error('Logout failed');
    }
};
