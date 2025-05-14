import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import Specialty from './section/Specialty'
import MedicalFacility from './section/MedicalFacility'
import OutstandingDoctor from './section/OutstandingDoctor'
import HandBook from './section/HandBook'
import About from './section/About'
import HomeFooter from './HomeFooter'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss'

export class HomePage extends Component {
    render() {
        let GeneralSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        let OutstandingSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5
        };
        return (
            <div>
                <HomeHeader />
                <Specialty settings={GeneralSettings} />
                <MedicalFacility settings={GeneralSettings} />
                <OutstandingDoctor settings={OutstandingSettings} />
                <HandBook settings={GeneralSettings} />
                <About />
                <HomeFooter />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)