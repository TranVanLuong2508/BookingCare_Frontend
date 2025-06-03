import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../HomePage/HomeHeader'
import './DetailDoctor.scss'
import doctorService from '../../../services/doctorService'
import { LANGUAGES } from '../../../utils'

export class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let doctorId = this.props.match.params.id
            let res = await doctorService.getDetailDoctor(doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {

    }

    render() {
        console.log('check state', this.state)
        let { language } = this.props
        let { detailDoctor } = this.state
        let nameEn = '', nameVi = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName} `
        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='img-avt-detail'>
                                <img src={detailDoctor.image} />
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.EN ? nameEn : nameVi}
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && (
                                    <>
                                        <span>{detailDoctor.Markdown.description}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'></div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.HTMLcontent && (
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.HTMLcontent }}>

                            </div>
                        )}
                    </div>
                    <div className='comment-doctor'></div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)