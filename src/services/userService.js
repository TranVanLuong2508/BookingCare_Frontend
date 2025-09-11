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
        return axios.get('/api/get-all-user', {
            params: {
                id: inputId
            }
        });
    },

    createNewUser: (newUserData) => {
        return axios.post('/api/create-new-user', newUserData)
    },

    deleteUser: (userIdToDelete) => {
        return axios.delete('/api/delete-user', {
            data: { id: userIdToDelete }
        })
    },

    editUser: (editUserData) => {
        return axios.put('/api/edit-user', editUserData)
    },

    getAllCodeService: (inputType) => {
        return axios.get('/api/allcode', {
            params: {
                type: inputType
            }
        })
    },
    loginWithGoogle: (credentialResponse) => {
        return axios.post('/api/auth/google', {
            token: credentialResponse.credential
        });
    }

}

export default userService