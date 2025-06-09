
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker'
import './ManageSchedule.scss'
import * as actions from '../../../store/actions/index'
import { LANGUAGES } from '../../../utils';
import doctorService from '../../../services/doctorService';
import FormattedDate from '../../../components/Formating/FormattedDate'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { dateFormat } from '../../../utils';


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctorOptions: [],
            selectedDoctor: '',
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount = () => {
        this.props.getAllDoctors()
        this.props.getAllScheduleTime()
    }


    componentDidUpdate = (prevProps, prevState, snapshots) => {
        if ((prevProps.listDoctors !== this.props.listDoctors) ||
            (prevProps.language !== this.props.language)) {
            let dataSelect = this.buildDoctorOptions(this.props.listDoctors)
            this.setState({
                listDoctorOptions: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let dataTime = this.props.allScheduleTime
            if (dataTime && dataTime.length > 0) {
                dataTime = dataTime.map((time, index) => {
                    time.isSelected = false
                    return time
                })
            }
            this.setState({
                rangeTime: dataTime
            })
        }
    }

    buildDoctorOptions = (listDoctorInput) => {
        let doctorOptions = []
        let { language } = this.props
        if (listDoctorInput && listDoctorInput.length > 0) {
            listDoctorInput.map((doctor, index) => {
                let doctorObject = {}
                let labelVi = `${doctor.lastName} ${doctor.firstName}`
                let labelEn = `${doctor.firstName} ${doctor.lastName}`

                doctorObject.label = language === LANGUAGES.VI ? labelVi : labelEn
                doctorObject.value = doctor.id
                doctorOptions.push(doctorObject)
            })
        }
        return doctorOptions
    }

    handleChangeSelect = async (selectedOptions) => {
        this.setState({
            selectedDoctor: selectedOptions,
        })
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickTimeBtn = (timeSelected) => {
        let { rangeTime } = this.state
        rangeTime = rangeTime.map((time, index) => {
            if (time.id === timeSelected.id) {
                time.isSelected = !time.isSelected
            }
            return time
        })
        this.setState({
            rangeTime: rangeTime
        })
    }

    handleSaveChangeSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected Doctor !")
            return
        }
        if (!currentDate) {
            toast.error("Invalid Date !")
            return
        }

        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formattedDate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0) {
            let selectedRangeTime = rangeTime.filter(time => time.isSelected === true)
            if (selectedRangeTime && selectedRangeTime.length > 0) {
                selectedRangeTime.map((time) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formattedDate
                    object.timeType = time.keyMap
                    result.push(object)
                })
            } else {
                toast.error("Invalid selected time !")
                return
            }
        }

        let callAPI = await doctorService.bulkCreateSchedule({
            arrSchedules: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        })

        console.log('checkl result', result)
        console.log('checkl callAPI', callAPI)
    }

    render() {
        let { language } = this.props
        let { rangeTime } = this.state
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id={"manage-schedule.title"} />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"manage-schedule.chooseDoctor"} /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctorOptions}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"manage-schedule.chooseDateTime"} /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    minDate={new Date()}
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0 && rangeTime.map((time, index) => {
                                    return (
                                        <button
                                            onClick={() => { this.handleClickTimeBtn(time) }}
                                            className={time.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                        >
                                            {language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-primary btn-save-schedule'
                                    onClick={() => { this.handleSaveChangeSchedule() }}
                                >
                                    <FormattedMessage id={"manage-schedule.saveInfor"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listDoctors: state.admin.listDoctors,
        allScheduleTime: state.admin.allSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        getAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
