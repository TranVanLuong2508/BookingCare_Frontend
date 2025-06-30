import actionTypes from './actionTypes';
import { userService } from '../../services';
import { ALLCODETYPES } from '../../utils';
import { toast } from "react-toastify";
import doctorService from '../../services/doctorService';
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
            console.log(error.message)
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

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await doctorService.getTopDoctor('')
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            } else {
                dispatch(fetchTopDoctorFailed())
            }
        } catch (error) {
            console.log('fetch outstading doctor failed: ', error)
            dispatch(fetchTopDoctorFailed())
        }
    }
}

export const fetchTopDoctorSuccess = (outstandingDoctors) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: outstandingDoctors
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await doctorService.getAllDoctor()
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data))
            } else {
                dispatch(fetchAllDoctorFailed())
            }
        } catch (error) {
            console.log('fetch ALL doctor failed: ', error)
            dispatch(fetchAllDoctorFailed())
        }
    }
}

export const fetchAllDoctorSuccess = (listDoctors) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    listDoctors: listDoctors
})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
})


export const saveDetailDoctorInfo = (detailInfo) => {
    return async (dispatch, getState) => {
        try {
            let res = await doctorService.saveDetailDoctorInfor(detailInfo)
            if (res && res.errCode === 0) {
                toast.success('Save doctor detail information success')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_INFOR_SUCCESS
                })
            } else {
                toast.error('Save doctor detail information failed')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_INFOR_FAILED
                })
            }
        } catch (error) {
            toast.error('Save doctor detail information have error')
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_INFOR_FAILED
            })
        }
    }
}


export const fetchDetailDoctorInfo = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await doctorService.getDetailDoctor(doctorId)
            console.log('check action', res)
            if (res && res.errCode === 0) {
                dispatch(fetchDetailDoctorInfoSuccess(res.data))
            } else {
                dispatch(fetchDetailDoctorInfoFailed())
            }
        } catch (error) {
            dispatch(fetchDetailDoctorInfoFailed())
        }
    }
}


export const fetchDetailDoctorInfoSuccess = (doctorData) => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_INFOR_SUCCESS,
    doctorInfo: doctorData
})

export const fetchDetailDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_INFOR_FAILED
})


export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.getAllCodeService("TIME")
            if (response && response.errCode === 0) {
                dispatch(fetchALlScheduleSuccess(response.data))
            } else {
                dispatch(fetchALlScheduleFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchALlScheduleFailed())
        }
    }
}

export const fetchALlScheduleSuccess = (listTime) => ({
    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
    allSchedule: listTime
})

export const fetchALlScheduleFailed = () => ({
    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED
})


export const fetchListPriceStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.getAllCodeService(ALLCODETYPES.price)
            if (response && response.errCode === 0) {
                dispatch(fetchlistPriceSuccess(response.data))
            } else {
                dispatch(fetchlistPriceFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchlistPriceFailed())
        }
    }
}

export const fetchlistPriceSuccess = (listPrice) => ({
    type: actionTypes.FETCH_LIST_PRICE_SUCCESS,
    allPrices: listPrice
})

export const fetchlistPriceFailed = () => ({
    type: actionTypes.FETCH_LIST_PRICE_FAILED
})

export const fetchlistPaymentStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.getAllCodeService(ALLCODETYPES.payment)
            if (response && response.errCode === 0) {
                dispatch(fetchlistPaymentSuccess(response.data))
            } else {
                dispatch(fetchlistPaymentFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchlistPaymentFailed())
        }
    }
}

export const fetchlistPaymentSuccess = (listPayment) => ({
    type: actionTypes.FETCH_LIST_PAYMENT_SUCCESS,
    allPayments: listPayment
})

export const fetchlistPaymentFailed = () => ({
    type: actionTypes.FETCH_LIST_PAYMENT_FAILED
})

export const fetchlistProvinceStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.getAllCodeService(ALLCODETYPES.province)
            if (response && response.errCode === 0) {
                dispatch(fetchlistProvinceSuccess(response.data))
            } else {
                dispatch(fetchlistProvinceFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchlistProvinceFailed())
        }
    }
}

export const fetchlistProvinceSuccess = (listProvince) => ({
    type: actionTypes.FETCH_LIST_PROVINCE_SUCCESS,
    allProvinces: listProvince
})

export const fetchlistProvinceFailed = () => ({
    type: actionTypes.FETCH_LIST_PROVINCE_FAILED
})



