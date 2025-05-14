import React, { Component } from 'react'
import { connect } from 'react-redux'

export class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <p> &copy; 2025 Trần Văn Lương CTU <a href='#'>More information, please click here!</a></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter)