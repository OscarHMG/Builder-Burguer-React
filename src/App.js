import React, { Component } from "react";
import Layout from './components/Layout/Layout';
import BurgerBuilder from "./containers/BurguerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect} from "react-router-dom";
//import { Orders } from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'

//NOTE: Debido al import default de la clase, el import debe hacerse sin los curlybraces.
import Orders from './containers/Orders/Orders';
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount (){
    this.props.onTryAutoSignUp();
  }
  render() {

    let routers = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" exact component={Auth}/>
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuth){
      routers = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" exact component={Orders}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/auth" exact component={Auth}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routers}
        </Layout>
      </div>
    );
  }
}

const matchStateToProps = (state) =>{
  return {
    isAuth : state.auth.token !== null
  }
}

const matchDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(matchStateToProps, matchDispatchToProps)(App));
