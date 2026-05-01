import api from './axios';

export const getTimetable = () => api.get('/timetable');
export const saveClass = (data) => api.post('/timetable', data);
export const deleteClass = (id) => api.delete(`/timetable/${id}`);
export const resetTimetable = () => api.post('/timetable/reset');
