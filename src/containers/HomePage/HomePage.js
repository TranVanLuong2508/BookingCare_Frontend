import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHeader />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)