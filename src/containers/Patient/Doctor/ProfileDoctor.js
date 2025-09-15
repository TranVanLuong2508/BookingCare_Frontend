
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doctorService } from '../../../services'
import { LANGUAGES } from '../../../utils'
import NumberFormat from 'react-number-format'
import "moment/locale/vi"
import moment from "moment"
import _ from "lodash"
import "./ProfileDoctor.scss"

export class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfileBookingModal: {}
        }
    }

    componentDidMount = async () => {
        let data = await this.getDataProfileBookingModal(this.props.doctorId)
        this.setState({
            dataProfileBookingModal: data
        })
    }

    componentDidUpdate = async (prevProps, prevState, smapshot) => {
        if (this.props.doctorId !== prevProps.doctorId) {
            await this.getDataProfileBookingModal(this.props.doctorId)
        }
    }

    getDataProfileBookingModal = async (inputId) => {
        let result = {}
        if (inputId) {
            let res = await doctorService.getProfileDoctorInfor(inputId)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    renderBookingTime = (dataTime) => {
        let language = this.props.language
        console.log('check render time')
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.EN ?
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
                :
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            let EditedDate = date
            if (language === LANGUAGES.VI) {
                EditedDate = date.charAt(0).toLocaleUpperCase() + date.slice(1)
            }
            return (
                <>
                    <div>{time} - {EditedDate}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>

    }



    render() {
        const { dataProfileBookingModal } = this.state
        const { doctorId, language, isShowDoctorDescription, dataTime } = this.props
        console.log("check dataTime  from props", dataTime)
        console.log("check doctor state", dataProfileBookingModal)
        let nameEn = '', nameVi = ''
        if (dataProfileBookingModal && dataProfileBookingModal.positionData) {
            nameVi = `${dataProfileBookingModal.positionData.valueVi}, ${dataProfileBookingModal.lastName} ${dataProfileBookingModal.firstName}`
            nameEn = `${dataProfileBookingModal.positionData.valueEn}, ${dataProfileBookingModal.firstName} ${dataProfileBookingModal.lastName} `
        }

        return (
            <>
                <div className='profile-doctor-modal-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='img-avt-detail'>
                                <img src={dataProfileBookingModal.image} />
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.EN ? nameEn : nameVi}
                            </div>
                            <div className='down'>
                                {isShowDoctorDescription === true ?
                                    <>
                                        {dataProfileBookingModal && dataProfileBookingModal.Markdown
                                            && dataProfileBookingModal.Markdown.description && (
                                                <>
                                                    <span>{dataProfileBookingModal.Markdown.description}</span>
                                                </>
                                            )}
                                    </>
                                    :
                                    <>
                                        {this.renderBookingTime(dataTime)}
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='price'>
                        {"Giá khám: "}
                        {dataProfileBookingModal && dataProfileBookingModal.Doctor_Infor && language === LANGUAGES.VI &&
                            < NumberFormat
                                className="currency"
                                value={dataProfileBookingModal.Doctor_Infor.priceData.valueVi}
                                displayType='text'
                                thousandSeparator={true}
                                suffix={'VND'}
                            />

                        }
                        {dataProfileBookingModal && dataProfileBookingModal.Doctor_Infor && language === LANGUAGES.EN &&

                            < NumberFormat
                                className="currency"
                                value={dataProfileBookingModal.Doctor_Infor.priceData.valueEn}
                                displayType='text'
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
})


const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)