
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class DefaultClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidUpdate = async (prevProps, prevState, smapshot) => {

    }

    render() {
        return (
            <>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass)