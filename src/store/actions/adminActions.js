import actionTypes from './actionTypes';
import { userService } from '../../services';
import { ALLCODETYPES } from '../../utils';

// export const addUserSuccess = () => ({
//     type: actionTypes.ADD_USER_SUCCESS
// })


//get genders
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

//get positon
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


export const createNewUser = (userData) => {

    return async (dispatch, getState) => {
        try {
            let response = await userService.createNewUser(userData)
            console.log(response)
            if (response && response.errCode === 0) {
                dispatch(createUserSuccess(response.data))
            } else {
                dispatch(createUserFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(createUserFailed())
        }
    }
}

export const createUserSuccess = (roleData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: roleData
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})