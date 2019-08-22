import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import {Redirect} from 'react-router-dom'


class Logout extends Component {

    componentDidMount(){
        this.props.onLogOut();
    }

    render (){
        return <Redirect to="/"/>
    }


}


const matchDispatchToProps = dispatch =>{
    return{
        onLogOut : () => dispatch(actions.logOut())
    }
}
export default connect(null, matchDispatchToProps)(Logout);
