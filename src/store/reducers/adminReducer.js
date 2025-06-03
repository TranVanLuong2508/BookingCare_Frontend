import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingRole: false,
    isLoadingPosition: false,
    genders: [],
    roles: [],
    positions: [],
    listUsers: [],
    ouststandingDoctors: [],
    listDoctors: [],
    doctorInfo: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            state.isLoadingPosition = false
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            state.isLoadingRole = false
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = false
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.listUsers = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.listUsers = []
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.ouststandingDoctors = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.ouststandingDoctors = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.listDoctors = action.listDoctors
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.listDoctors = []
            return {
                ...state
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_INFOR_SUCCESS:
            state.doctorInfo = action.doctorInfo
            console.log('check', action)
            return {
                ...state
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_INFOR_FAILED:
            state.doctorInfo = {}
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;