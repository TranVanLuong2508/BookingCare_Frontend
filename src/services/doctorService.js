import axios from '../axios';

const doctorService = {

    getTopDoctor: (limitInput) => {
        return axios.get('/api/outstading-doctor', {
            params: {
                limit: limitInput
            }
        });
    },

    getAllDoctor: () => {
        return axios.get('/api/get-all-doctor');
    },

    saveDetailDoctorInfor: (detailUserInfor) => {
        return axios.post('/api/post-detail-infor-doctor', detailUserInfor)
    },

    getDetailDoctor: (doctorId) => {
        return axios.get('/api/get-detail-infor-doctor', {
            params: {
                id: doctorId
            }
        });
    },

    bulkCreateSchedule: (data) => {
        return axios.post('/api/bulk-create-schedule', data)
    },

    getDoctorScheduleByDate: (doctorIdInput, dateInput) => {
        return axios.get('/api/get-schedule-doctor-by-date', {
            params: {
                doctorId: doctorIdInput,
                date: dateInput
            }
        })
    },

    getExtraInforDoctor: (doctorId) => {
        return axios('/api/get-extra-infor-by-id', {
            params: {
                id: doctorId
            }
        })
    }
}

export default doctorService