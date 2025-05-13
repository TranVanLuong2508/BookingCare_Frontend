import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import Specialty from './section/Specialty'
import MedicalFacility from './section/MedicalFacility'

import './HomePage.scss'

export class HomePage extends Component {
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <div>
                <HomeHeader />
                <Specialty settings={settings} />
                <MedicalFacility />
                {/* <div className='section-4' style={{ height: '330px', border: '1px solid green', padding: '20px', margin: '20px' }}></div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)