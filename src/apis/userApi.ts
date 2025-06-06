import { User } from '../models/user';
import api from '../utils/api';

export const getCurrentUsersProfile = async (): Promise<User> => {
    try {
        const response = await api.get(`/me`);
        return response.data;
    } catch (error) {
        throw new Error('fail to fatch profile');
    }
};
