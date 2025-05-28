import axios from '../axios';

const doctorService = {

    getTopDoctor: (limitInput) => {
        return axios.get('/api/outstading-doctor', {
            params: {
                limit: limitInput
            }
        });
    },

}

export default doctorService