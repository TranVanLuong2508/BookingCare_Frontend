import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Select from 'react-select';

//react-markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import { LANGUAGES } from '../../utils';
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
            listDoctorOptions: []
        }
    }

    componentDidMount = () => {
        this.props.getAllDoctors()
    }

    componentDidUpdate = (prevProps, prevState, snapshots) => {
        if ((prevProps.listDoctors !== this.props.listDoctors) ||
            (prevProps.language !== this.props.language)) {
            let dataSelect = this.buildDoctorOptions(this.props.listDoctors)
            this.setState({
                listDoctorOptions: dataSelect
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
        this.props.saveDetailDoctor({
            HTMLcontent: this.state.HTMLcontent,
            MarkdownContent: this.state.MarkdownContent,
            description: this.state.description,
            doctorId: this.state.selectedDoctorOption.value
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({
            selectedDoctorOption: selectedDoctor
        })
    };

    render() {
        console.log('check state', this.state)
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ:</label>
                            <Select
                                value={this.selectedDoctorOption}
                                onChange={this.handleChange}
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
                                flidofshjfdf
                            </textarea>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <button
                        className='save-content-doctor'
                        onClick={() => { this.handleClickSaveContent() }}
                    >
                        Lưu thông tin
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (detailInfo) => dispatch(actions.saveDetailDoctorInfo(detailInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);