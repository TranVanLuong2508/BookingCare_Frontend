import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';

export class OutstandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrTopDoctors: []
        }
    }

    componentDidMount = () => {
        this.props.loadTopDoctor()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrTopDoctors: this.props.topDoctors
            })
        }
    }

    render() {
        let { arrTopDoctors } = this.state
        console.log(arrTopDoctors)
        let { language } = this.props
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section btn-background'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrTopDoctors && arrTopDoctors.length > 0 && arrTopDoctors.map((doctor, index) => {
                                let imgBase64 = new Buffer.from(doctor.image, 'base64').toString('binary')
                                let nameVi = `${doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}`
                                let nameEn = `${doctor.positionData.valueEn} ${doctor.firstName} ${doctor.lastName} `
                                return (
                                    <div className='img-customize img-doctor-customize' key={doctor.id}>
                                        <div className='img-custom img-doctor'>
                                            <img src={imgBase64} />
                                        </div>
                                        <div className='img-title'><span>{language === LANGUAGES.EN ? nameEn : nameVi}</span></div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    topDoctors: state.admin.ouststandingDoctors,
    language: state.app.language
})

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)