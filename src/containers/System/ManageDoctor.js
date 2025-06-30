import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Select from 'react-select';

//react-markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import { ACTIONS, LANGUAGES } from '../../utils';
import doctorService from '../../services/doctorService';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            HTMLcontent: '',
            MarkdownContent: '',
            selectedDoctorOption: '',
            description: '',
            listDoctorOptions: [],

            hasOldData: false,

            listPriceOptions: [],
            listPaymentOptions: [],
            listProvinceOptions: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            clinicName: '',
            clinicAddress: '',
            note: ''
        }
    }

    componentDidMount = () => {
        this.props.getAllDoctors()
        this.props.fetchlistPriceStart()
        this.props.fetchlistPaymentStart()
        this.props.fetchlistProvinceStart()
    }

    componentDidUpdate = (prevProps, prevState, snapshots) => {
        if ((prevProps.listDoctors !== this.props.listDoctors) ||
            (prevProps.language !== this.props.language)) {
            let dataSelect = this.buildSelectOptions(this.props.listDoctors, 'USERS')
            let dataPaymentSelect = this.buildSelectOptions(this.props.listAllPaymentFromProps, 'DATA')
            let dataPriceSelect = this.buildSelectOptions(this.props.listAllPriceFromProps, 'DATA')
            let dataProvinceSelect = this.buildSelectOptions(this.props.listAllProvinceFromProps, 'DATA')
            this.setState({
                listDoctorOptions: dataSelect,
                listPaymentOptions: dataPaymentSelect,
                listProvinceOptions: dataProvinceSelect,
                listPriceOptions: dataPriceSelect
            })
        }

        if (prevProps.listAllPaymentFromProps !== this.props.listAllPaymentFromProps) {
            let dataSelect = this.buildSelectOptions(this.props.listAllPaymentFromProps, 'DATA')
            this.setState({
                listPaymentOptions: dataSelect
            })
        }
        if (prevProps.listAllPriceFromProps !== this.props.listAllPriceFromProps) {
            let dataSelect = this.buildSelectOptions(this.props.listAllPriceFromProps, 'DATA')
            this.setState({
                listPriceOptions: dataSelect
            })
        }
        if (prevProps.listAllProvinceFromProps !== this.props.listAllProvinceFromProps) {
            let dataSelect = this.buildSelectOptions(this.props.listAllProvinceFromProps, 'DATA')
            this.setState({
                listProvinceOptions: dataSelect
            })
        }
    }

    buildSelectOptions = (dataInput, Type) => {
        let Options = []
        let { language } = this.props
        if (dataInput && dataInput.length > 0) {
            dataInput.map((item, index) => {
                let Object = {}
                let labelVi = Type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = Type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn

                Object.label = language === LANGUAGES.VI ? labelVi : labelEn
                Object.value = item.id
                Options.push(Object)
            })
        }
        return Options
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            HTMLcontent: html,
            MarkdownContent: text
        })
    }

    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleClickSaveContent = () => {

        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            HTMLcontent: this.state.HTMLcontent,
            MarkdownContent: this.state.MarkdownContent,
            description: this.state.description,
            doctorId: this.state.selectedDoctorOption.value,

            action: hasOldData === true ? ACTIONS.EDIT : ACTIONS.CREATE
        })

        this.setState({
            HTMLcontent: '',
            MarkdownContent: '',
            description: '',

            hasOldData: false
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({
            selectedDoctorOption: selectedDoctor,
        })

        let res = await doctorService.getDetailDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let mardown = res.data.Markdown
            this.setState({
                HTMLcontent: mardown.HTMLcontent,
                MarkdownContent: res.data.Markdown.MarkdownContent,
                description: res.data.Markdown.description,

                hasOldData: true
            })
        } else {
            this.setState({
                HTMLcontent: '',
                MarkdownContent: '',
                description: '',

                hasOldData: false
            })
        }
    };

    render() {
        console.log('check props', this.props)
        console.log('check state', this.state)
        let { hasOldData } = this.state
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ:</label>
                            <Select
                                value={this.state.selectedDoctorOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctorOptions}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label>Thông tin giới thiệu:</label>
                            <textarea
                                onChange={(e) => this.handleChangeDescription(e)}
                                value={this.state.description}
                                className='form-control'
                                rows={"4"}
                            >

                            </textarea>
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá:</label>
                            <Select
                                placeholder={"Chọn giá"}
                                value={this.state.selectedDoctorOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPriceOptions}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức thanh toán:</label>
                            <Select
                                placeholder={"Chọn phương thức thanh toán"}
                                value={this.state.selectedDoctorOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPaymentOptions}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành:</label>
                            <Select
                                placeholder={"Chọn tỉnh thành"}
                                value={this.state.selectedDoctorOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listProvinceOptions}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên phòng khám:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Note:</label>
                            <input className='form-control' />
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor
                            value={this.state.MarkdownContent}
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <button
                        className={hasOldData === true ? 'save-content-doctor' : "create-content-doctor"}
                        onClick={() => { this.handleClickSaveContent() }}
                    >
                        {hasOldData === true ? (<span>Lưu thông tin</span>) : (<span>Tạo thông tin</span>)}
                    </button>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listDoctors: state.admin.listDoctors,
        language: state.app.language,
        listAllPriceFromProps: state.admin.allPrice,
        listAllProvinceFromProps: state.admin.allProvince,
        listAllPaymentFromProps: state.admin.allPayment,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (detailInfo) => dispatch(actions.saveDetailDoctorInfo(detailInfo)),
        fetchlistPriceStart: () => dispatch(actions.fetchListPriceStart()),
        fetchlistPaymentStart: () => dispatch(actions.fetchlistPaymentStart()),
        fetchlistProvinceStart: () => dispatch(actions.fetchlistProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);