import axios from '../axios';

const userService = {

    handleLogin: (email, password) => {
        return axios.post('/api/login', {
            email: email,
            password: password
        })
    },

    handleLogout: () => {

    },

    getAllUsers: (inputId) => {
        return axios.get(`/api/get-all-user?id=${inputId}`)
    },

    createNewUser: (newUserData) => {
        return axios.post('/api/create-new-user', newUserData)
    }

}

export default userService