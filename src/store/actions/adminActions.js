import actionTypes from './actionTypes';
import { userService } from '../../services';
import { ALLCODETYPES } from '../../utils';
import { toast } from "react-toastify";
//fetch genders data
export const fetchGenderStart = () => {
    //use redux thunk
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let response = await userService.getAllCodeService(ALLCODETYPES.gender)
            if (response && response.errCode === 0) {
                dispatch(fetchGenderSuccess(response.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchGenderFailed())
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//fetch positon data

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let response = await userService.getAllCodeService(ALLCODETYPES.position)
            if (response && response.errCode === 0) {
                dispatch(fetchPositionSuccess(response.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchPositionFailed())
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//fetch role data

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let response = await userService.getAllCodeService(ALLCODETYPES.role)
            if (response && response.errCode === 0) {
                dispatch(fetchRoleSuccess(response.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchRoleFailed())
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


//create new user

export const createNewUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.createNewUser(userData)
            if (response && response.errCode === 0) {
                toast.success("Create a user success !")
                dispatch(createUserSuccess(response.data))
                dispatch(fetchAllUserStart())
            } else {
                dispatch(createUserFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(createUserFailed())
        }
    }
}

export const createUserSuccess = (userData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: userData
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//fetch All User 

export const fetchAllUserStart = () => {

    return async (dispatch, getState) => {
        try {
            let response = await userService.getAllUsers('ALL')
            if (response && response.errCode === 0) {
                let users = response.users.reverse()
                dispatch(fetchAllUserSuccess(users))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchAllUserFailed())
        }
    }
}


export const fetchAllUserSuccess = (listUsers) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: listUsers
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

//delete User
export const deleteUser = (userIdToDelete) => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.deleteUser(userIdToDelete)
            if (response && response.errCode === 0) {
                toast.success("Delete a user success !")
                dispatch(deleteUserSuccess(response.data))
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = (userData) => ({
    type: actionTypes.DELETE_USER_FAILED,
    data: userData
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


//edit user
export const EditUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.editUser(userData)
            console.log('check edit', response)
            if (response && response.errCode === 0) {
                toast.success("Edit a user success !")
                dispatch(EditUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(EditUserFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(EditUserFailed())
        }
    }
}

export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
