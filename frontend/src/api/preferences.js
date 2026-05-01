import api from './axios';

export const getPreferences = () => api.get('/preferences');
export const updatePreferences = (data) => api.patch('/preferences', data);