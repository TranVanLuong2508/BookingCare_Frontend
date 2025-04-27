import axios from '../axios';

const userService = {
    handleLogin: (email, password) => {
        return axios.post('/api/login', {
            email: email,
            password: password
        })
    },
    handleLogout: () => {

    }
}

export default userService