import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import moment from 'moment'
import "moment/locale/vi"
import './DoctorSchedule.scss'
import BookingModal from './Modal/BookingModal';
import { FORMAT_BY_MOMENT, LANGUAGES } from '../../../utils';
import { doctorService } from '../../../services';

export class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],

            isOpenBookingModal: false,
            dataScheduleTimeModal: {}
        }
    }

    getArrayAllDays = (language) => {
        let allDaysOptions = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let rawDateVi = moment(new Date()).add(i, 'days').format(FORMAT_BY_MOMENT.VI_LOCALE) // ex: thứ 3-10/06
                    object.label = rawDateVi.charAt(0).toUpperCase() + rawDateVi.slice(1); // ex: Thứ 3-10/06
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale(LANGUAGES.EN).format(FORMAT_BY_MOMENT.EN_LOCALE)
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDaysOptions.push(object)
        }
        return allDaysOptions
    }

    handleChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.value.toString()
            let allDoctorScheduleByDate = await doctorService.getDoctorScheduleByDate(doctorId, date)
            if (allDoctorScheduleByDate && allDoctorScheduleByDate.errCode === 0) {
                this.setState({
                    allAvailableTime: allDoctorScheduleByDate.data ? allDoctorScheduleByDate.data : []
                })
            }
        }
    }

    componentDidMount = async () => {
        let { language } = this.props
        let res = this.getArrayAllDays(language)
        let allDays = this.getArrayAllDays(language)
        if (allDays && allDays.length > 0) {
            let res = await doctorService.getDoctorScheduleByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allDays: allDays,
            })
        }
        this.setState({
            allDays: res
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.language !== this.props.language) {
            let res = this.getArrayAllDays(this.props.language)
            console.log('check all day', res)
            this.setState({
                allDays: res
            })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrayAllDays(this.props.language)
            let res = await doctorService.getDoctorScheduleByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    toggleBookingModal = () => {
        this.setState({
            isOpenBookingModal: !this.state.isOpenBookingModal
        })
    }

    closeBookingModale = () => {
        this.setState({
            isOpenBookingModal: false
        })
    }

    handleClickButtonSchedule = (time) => {
        console.log('check time', time)
        this.setState({
            isOpenBookingModal: true,
            dataScheduleTimeModal: time
        })
    }
    render() {
        let { allDays, allAvailableTime } = this.state
        let { language } = this.props
        console.log('check component state', this.state)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <Select
                            onChange={this.handleChangeSelect}
                            options={allDays}
                            styles={{
                                container: (base) => ({
                                    ...base,
                                    width: '170px',
                                    border: 'none',
                                }),
                            }}
                            value={allDays.length > 0 ? allDays[0] : ''}
                        />
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span>lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((time, index) => {
                                            return (
                                                <button
                                                    onClick={() => { this.handleClickButtonSchedule(time) }}
                                                    key={`availableTime-${index}`}
                                                >
                                                    {language === LANGUAGES.EN ?
                                                        time.timeTypeData.valueEn
                                                        :
                                                        time.timeTypeData.valueVi}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='book-free-text'>
                                        <span>Chọn và đặt (miễn phí )</span>
                                    </div>
                                </>
                                :
                                <div>Không có lịch nào cả</div>
                            }

                        </div>
                    </div >
                </div>
                <BookingModal
                    toggle={this.toggleBookingModal}
                    isOpen={this.state.isOpenBookingModal}
                    closeBookingModale={this.closeBookingModale}
                    dataTime={this.state.dataScheduleTimeModal}
                />
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)