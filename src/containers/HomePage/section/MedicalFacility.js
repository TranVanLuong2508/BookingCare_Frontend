import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./MedicalFacility.scss"

export class MedicalFacility extends Component {
    render() {
        return (
            <div>MedicalFacility</div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)